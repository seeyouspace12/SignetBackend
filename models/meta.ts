export class TableMeta {
    page: number;
    perPage: number;
    from: number;
    to: number;
    total: number;
    totalPages: number;

    constructor(page = 1, perPage = 10, total) {
        if (!total) {
            return;
        }
        this.page = page;
        this.perPage = perPage;
        this.total = total;
        this.totalPages = Math.ceil(total / perPage);
        this.from = perPage * (page - 1);
        this.to = Number(this.from) + Number(perPage);
        if (this.to > this.total) {
            this.to = this.total;
        }
    }
}