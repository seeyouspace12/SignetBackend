import {sortTable} from "../functions/tableFunctions";
import {TableMeta} from "./meta";
import {Table} from "./interfaces";

export class Film {
    name: string;
    genre: string;
    leadStudio: string;
    audienceScore: string;
    profitability: string;
    rottenTomatoes: string;
    worldwideGross: string
    year: string;

    constructor(input) {
        if (!input) {
            return
        }
        this.name = input[0];
        this.genre = input[1];
        this.leadStudio = input[2];
        this.audienceScore = input[3];
        this.profitability = input[4];
        this.rottenTomatoes = input[5];
        this.worldwideGross = input[6];
        this.year = input[7];
    }
}

export class FilmList implements Table {
    data: Film[] = [];
    meta: TableMeta;

    public setMeta(page: number, perPage: number) {
        this.meta = new TableMeta(page, perPage, this.data.length);
    }

    public add(film: Film) {
        this.data.push(film);
    }

    public clear() {
        this.data = [];
    }

    public sort(column, param) {
        this.data = sortTable(this.data, column, param);
    }

    public search(searchText) {
        this.data = this.data.filter(film => film.name.includes(searchText));
    }

    public filter(column, value) {
        if (column === 'year') {
            this.data = this.data.filter(item => value.includes(item[column]))
        } else {
            this.data = this.data.filter(item => item[column].toLowerCase() === value.toLowerCase());
        }
    }
}

export class GetFilmsParams {
    page?: number;
    perPage?: number;
    search: {
        name: string;
    };

    sort: {
        name: string;
        genre: string;
        leadStudio: string;
        audienceScore: string;
        profitability: string;
        rottenTomatoes: string;
        worldwideGross: string
        year: string;
    };

    filters: {
        genre: string;
        year: number[];
    }

    constructor(input) {
        if (!input) {
            return;
        }
        Object.keys(input).forEach(key => {
            if (input[key]) {
                this[key] = input[key];
            }
        })
    }
}
