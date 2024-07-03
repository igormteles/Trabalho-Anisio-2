import { Estoque } from "./Estoque"

export class Item {
    estoqueID: number
    quantidade: number
    nome: string

    constructor (estoqueID: number, quantidade: number, nome: string){
        this.estoqueID = estoqueID
        this.quantidade = quantidade
        this.nome = nome
    }
}