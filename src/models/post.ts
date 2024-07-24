export type PostData = {
    codigoVaga: string;
    localVaga: string;
    dataVaga: string;
    nomeVaga: string;
    descVaga: string;
};

export class PostEntity {
    codigoVaga: string;
    localVaga: string;
    dataVaga: string;
    nomeVaga: string;
    descVaga: string;
    constructor(data: PostData) {
        this.codigoVaga = data.codigoVaga;
        this.dataVaga = data.dataVaga;
        this.descVaga = data.descVaga;
        this.localVaga = data.localVaga;
        this.nomeVaga = data.nomeVaga;
    }
}
