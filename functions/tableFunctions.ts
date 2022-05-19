import {Film} from "../models/films";
import {Table} from "../models/interfaces";

export function getFilteredData(itemList: Table, params, searchBy: string): Film[] {
    if (params.search?.[searchBy]) {
        itemList.search(params.search[searchBy]);
    }
    if (params.filters) {
        Object.keys(params.filters).forEach(filterName => {
            itemList.filter(filterName, params.filters[filterName])
        })
    }
    if (params.sort) {
        const sortedColumnName = Object.keys(params.sort)[0]
        itemList.sort(sortedColumnName, params.sort[sortedColumnName]);
    }
    return itemList.data;
}

export function paginateData(from: number = 0, to: number = 9, data: any[]) {
    return data.slice(from, to);
}

export function sortTable(data, column, param) {
    if (param !== 'asc' && param !== 'desc') {
        return data;
    }
    data.sort((a, b) => {
        if (a[column] > b[column]) {
            return param === 'asc' ? 1 : -1;
        }
        if (a[column] < b[column]) {
            return param === 'asc' ? -1 : 1;
        }
        return 0;
    })
    return data;
}