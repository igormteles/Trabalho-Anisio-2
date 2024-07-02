//CONTADOR QUE GERA O ID CONTÍNUO
let contador:number = 0

export class Estoque{
    id:number
    modalidadeID: number
    quantidade: number = 0
    precoVenda: number

    constructor (modalidadeID: number, quantidade: number, precoVenda: number){
        this.id = this.gerarId()
        this.modalidadeID = modalidadeID
        this.quantidade = quantidade
        this.precoVenda = precoVenda
    }

    private gerarId(){
        contador += 1
        return contador
    }
}