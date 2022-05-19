import {Request, Response} from "express";
import express from "express";

const http = require("http");
const app = express();
const cors = require('cors');
const {parse} = require("csv-parse");
const bodyParser = require('body-parser')
const fs = require('fs');
import {Film, FilmList, GetFilmsParams} from "../models/films";
import {getFilteredData, paginateData} from "../functions/tableFunctions";

const filmList: FilmList = new FilmList();

app.use(cors());
const PORT = 8000;

const server = http.createServer();

server.on('request', (req: Request, res: Response) => {
    res.end('server worked!!!');
})

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

app.set('port', PORT);

function getFilms(res: Response, params: GetFilmsParams) {
    if (!params.perPage || params.perPage < 0) {
        params = {...params, perPage: 10};
    }
    if (!params.page) {
        params = {...params, page: 1};
    }
    const readStream = fs.createReadStream('assets/films.csv')
        .pipe(parse({delimiter: ",", from_line: 2}))
        .on("data", function (row) {
            filmList.add(new Film(row));
        })
        .on("error", function (error) {
            res.status(400).json(error.message);
        })
        .on('end', function () {
            filmList.setMeta(params.page, params.perPage);
            const filteredData = getFilteredData(filmList, params, 'name');
            res.status(200).json({data: paginateData(filmList.meta.from, filmList.meta.to, filteredData), meta: filmList.meta
        });
            readStream.destroy();
        });
}

app.get("/films", async (req: Request, res: Response) => {
    filmList.clear();
    getFilms(res, new GetFilmsParams(req.query));
})

app.listen(PORT, () => {
    console.log(`Server is running in http://localhost:${PORT}`)
})