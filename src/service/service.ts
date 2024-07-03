import { Estoque } from "../model/Estoque";
import { Pao } from "../model/ModalidadePaes";
import { Venda } from "../model/Venda";
import { PadariaRepository } from "../repository/PadariaRepository";
import { Item } from "../model/item";

export class PaoService {
    padariaRepository: PadariaRepository = new PadariaRepository()

//FUNÇÃO PARA CADASTRAR UMA NOVA MODALIDADE DE PÃO
    cadastrarModalidade(novaModalidade: any): Pao {
        const {nome, vegano} = novaModalidade
        if(!nome || vegano == null){
            throw new Error("Informações incompletas")
        }
        const novoPao = new Pao(nome, vegano)
        this.padariaRepository.inserePao(novoPao)

        return novoPao
    }
    
//FUNÇÃO QUE BUSCA PÃO POR ID
    buscarPao(id: any): Pao|undefined{
        const paoID: number = parseInt(id, 10)
        console.log(id)
        return this.padariaRepository.buscaPaoPorID(paoID)
    }

//FUNÇÃO PARA LISTAR TODAS AS MODALIDADES DE PÃO 
    listarPao(): Pao[]{
        if(this.padariaRepository.listaPaes.length !== 0){
            return this.padariaRepository.listarPao()
        }else{
            throw new Error("Não há produtos cadastrados!")
        }
    }

//FUNÇÃO PARA REMOVER UMA MODALIDADE POR ID
    deletaPao(novoPao: Pao) {
        let pao = this.buscarPao(novoPao.id)
        if(pao !== novoPao){
            throw new Error("Produto não encontrado!!! Verifique as informações e tente novamente.")
        }

        this.padariaRepository.deletaPao(pao)
    }

//FUNÇÃO PARA ATUALIZAÇÃO DE UMA MODALIDADE
    alterarPao(novoPao: Pao): Pao{
        const {id, nome, vegano} = novoPao
        if(!nome || !id || vegano == null){
            throw new Error("Informações imcompletas")
        }

        let pao = this.buscarPao(id)
        if(!pao){
            throw new Error ("Pão não encontrado")
        }

        pao.nome = nome
        pao.vegano = vegano
        this.padariaRepository.alterarPao(pao)
        return pao
    }

//FUNÇÃO QUE LISTA OS ITENS DO ESTOQUE E SUAS RESPECITVAS QUANTIDADES
    listarEstoque(){
        if(this.padariaRepository.listaEstoque.length !== 0){
            return this.padariaRepository.listarEstoque()
        }else{
            throw new Error("Estoque vazio!")
        }
    }

//FUNÇÃO QUE ADICIONA ITEM AO ESTOQUE PELO ID DO PRODUTO E RETORNA ERRO POR INFORMAÇÕES INCOMPLETAS OU SE O ID DE MODALIDADE NÃO FOR EXISTENTE
    adicionarItem(item: any): Estoque{
        const {modalidadeID, quantidade, precoVenda} = item
        if(!modalidadeID || !quantidade || !precoVenda){
            throw new Error("Informações incompletas")
        }
        if(!this.buscarPao(modalidadeID)){
            throw new Error("ID de Modalidade de Pão não cadastrado. Cadastre a Modalidade")
        }
        const novoItem = new Estoque(modalidadeID, quantidade, precoVenda)
        this.padariaRepository.adicionarItem(novoItem)
        return novoItem
    }

//FUNÇÃO QUE BUSCA ITEM DO ESTOQUE POR ID
    buscaItem(id:any): Estoque | undefined{
        const itemID: number = parseInt(id, 10)

        if(this.padariaRepository.buscaItem(itemID)){
             return this.padariaRepository.buscaItem(itemID)
        }
        throw new Error ("Item não encontrado no estoque!!!")
    }

//FUNÇÃO QUE ADICIONA DETERMINADA QUANTIDADE A UM ITEM DO ESTOQUE
    adicionarEstoque(item: any): Estoque{
        const {id, modalidadeID, quantidade, precoVenda} = item
        if(!modalidadeID || !precoVenda || !quantidade){
            throw new Error("Informações imcompletas")
        }

        let itemAlterado = this.buscaItem(id)
        if(!itemAlterado){
            throw new Error ("Estoque não encontrado")
        }

        itemAlterado.id = id
        itemAlterado.precoVenda = precoVenda
        itemAlterado.modalidadeID = modalidadeID
        itemAlterado.quantidade += quantidade
        this.padariaRepository.atualizarEstoque(item)
        return itemAlterado
    }

//FUNÇÃO QUE DELETA DETERMINADA QUANTIDADE A UM ITEM DO ESTOQUE
    deletarEstoque(item: any): Estoque{
        const {id, modalidadeID, quantidade, precoVenda} = item
        if(!id || !modalidadeID || !precoVenda || !quantidade){
            throw new Error("Informações imcompletas")
        }

        let itemAlterado = this.buscaItem(id)
        if(!itemAlterado){
            throw new Error ("Estoque não encontrado")
        }
        if(quantidade>itemAlterado.quantidade){
            throw new Error("Não é possível remover mais do que a quantidade em estoque")
        }

        itemAlterado.id = id
        itemAlterado.precoVenda = precoVenda
        itemAlterado.modalidadeID = modalidadeID
        itemAlterado.quantidade -= quantidade
        this.padariaRepository.atualizarEstoque(item)
        return itemAlterado
    }

//FUNÇÃO QUE RECUPERA UMA VENDA POR ID

    recuperaVendaPorId(id:any): Venda| undefined{
        const vendaID: number = parseInt(id, 10)
        console.log(id)
        return this.padariaRepository.recuperaVendaPorId(vendaID);
    }

//FUNÇÃO QUE CRIA UMA VENDA

    criaVenda(venda: Venda): Venda{
        let i:number = 0
        let valorTotal:number = 1;
        const {cpfCliente, listaItens} = venda
        if(!cpfCliente || !listaItens){
            throw new Error("Informações incompletas")
        }
        for(i=0; i<listaItens.length; i++){
            let precoItem: number | undefined = this.buscaItem(listaItens[i].estoqueID)?.precoVenda
            let estoque: Estoque | undefined = this.buscaItem(listaItens[i].estoqueID)
            let error: number = 0
            if(estoque){
                let erro:string = "A quantidade pedida na vendo dos seguintes itens é maior que a em estoque:"
                
                if(estoque.quantidade < listaItens[i].quantidade){
                    erro += ` ${estoque.modalidadeID}`
                    error = 1
                }
                
                if(error == 1){
                    throw new Error(erro)
                }
                estoque.quantidade -= listaItens[i].quantidade
                this.padariaRepository.atualizarEstoque(estoque)
            }
            if(precoItem){
                valorTotal *=  precoItem * listaItens[i].quantidade
            }
        }
        const novaVenda = new Venda(cpfCliente, valorTotal, listaItens)
        this.padariaRepository.criaVenda(novaVenda)

        return novaVenda
    }


}