//CONTADOR QUE GERA O ID CONTÍNUO
let contador:number = 0
import { Item } from "./item";
import { Estoque } from "./Estoque"; 

export class Venda{
    listaItens: Item[] = []
    id:number;
    cpfCliente: string;
    valorTotal: number = 0;

    

    constructor (cpfCliente: string, valorTotal:number, listaItens: Item[]){
        this.id = this.gerarId()
        this.cpfCliente = cpfCliente
        this.listaItens = listaItens
        this.valorTotal = valorTotal
    }



    private gerarId(){
        contador += 1
        return contador
    }
}