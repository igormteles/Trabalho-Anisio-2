import { Pao } from "../model/ModalidadePaes";
import { Estoque } from "../model/Estoque";
import { Venda } from "../model/Venda";

export class PadariaRepository{
    listaPaes: Pao[] = []
    listaEstoque: Estoque[] = []
    listaItens: Venda[] = []

    inserePao (pao: Pao){
        this.listaPaes.push(pao);
    }

    buscaPaoPorID(id:number): Pao|undefined{
        return this.listaPaes.find(pao => pao.id === id);
    }

    listarPao(){
        return this.listaPaes;
    }

    deletaPao(pao: any){
        const index = this.listaPaes.indexOf(pao);
        if(index !== -1){
            this.listaPaes.splice(index, 1);
        }

    }

    alterarPao(pao: Pao){
        const index = this.listaPaes.indexOf(pao);
        if(index !==-1){
            this.listaPaes[index] = pao;
        }
        return index;
    }

    listarEstoque (){
        return this.listaEstoque;
    }

    adicionarItem (item: any){
        this.listaEstoque.push(item);
    }
    
    buscaItem(id:number): Estoque |undefined {
        return this.listaEstoque.find(estoque => estoque.modalidadeID === id);
    }

    atualizarEstoque(item: any) {
        const index = this.listaEstoque.indexOf(item);
        if(index !==-1){
            this.listaEstoque[index] = item;
        }
        return index;
    }

    criaVenda(venda: Venda){
        this.listaItens.push(venda);
    }
    
    recuperaVendaPorId(id:number):Venda| undefined{
       return this.listaItens.find(venda => venda.id === id);
    }
}