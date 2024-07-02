import { Estoque } from "./Estoque"

export class Item {
    estoqueID: number
    quantidade: number

    constructor (estoqueID: number, quantidade: number){
        this.estoqueID = estoqueID
        this.quantidade = quantidade
    }
}