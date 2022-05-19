export interface Table {
    data: any[];
    add: (item: object) => void;
    clear: () => void;
    search: (searchText: string) => void;
    sort: (column: string, param: string) => void;
    filter: (column: string, value: string) => void;
}