import { Request, Response } from "express";
import { PaoService } from "../service/service";
const paoService = new PaoService();


/*

===================================================================
===========================               =========================
===========================  MODALIDADES  =========================
===========================               =========================
===================================================================

*/ 

export function listaPao (req: Request, res: Response){
    try {
        res.status(200).json(paoService.listarPao());
    } catch (error: any) {
        res.status(400).json({ message: error.message});
    }
}

/*
====================== CADASTRA PÃO  =====================

*/ 

export function cadastraPao (req: Request, res: Response){
    try {
        const novaModalidade = paoService.cadastrarModalidade(req.body);
        res.status(201).json(
            {
                mensagem: "Modalidade Cadastrada com sucesso!",
                modalidade: novaModalidade
            }
            );
    } catch (error: any) {
        res.status(400).json({ message: error.message});
    }
}

/*
======================= ALTERA PÃO =======================

*/ 


export function alteraPao (req: Request, res: Response){
    

    try{
        const novoPao = paoService.alterarPao(req.body);
        res.status(200).json({message:"Produto alterado com sucesso!!!"})
    } catch (error:any){
        res.status(400).json({message: error.message})
    }
}

/*
======================  DELETA PÃO  ======================

*/ 

export function deletaPao (req: Request, res: Response){

    try{
        paoService.deletaPao(req.body)
        res.status(201).json({message:"Modalidade de Pão deletada com sucesso!!!"})
    } catch (error:any) {
        res.status(400).json({message: error.message})
    }
}

/*
======================  BUSCA PÃO  =======================
*/ 

export function buscaPao (req: Request, res: Response){ 
    try {
        const pao = paoService.buscarPao(req.params.id);

        if(pao){
            res.status(201).json(
                {
                    mensagem: "Pão encontrado!",
                    modalidade: pao
                }
                );
        }else{
            res.status(404).json({mensagem: "Este pão não foi encontrado, verifique o ID e tente novamente"})
        }
    } catch (error: any) {
        res.status(400).json({message: error.message,});
    }
}


/*






===================================================================
=============================           ===========================
=============================  ESTOQUE  ===========================
=============================           ===========================
===================================================================







*/ 

/*
==========================  LISTA ESTOQUE  ===========================
*/ 

export function listarEstoque (req: Request, res: Response){
    try {
        res.status(200).json(paoService.listarEstoque());
    } catch (error: any) {
        res.status(400).json({ message: error.message});
    }
}

/*
=======================  ADICIONA ITEM AO ESTOQUE ====================
*/ 

export function adicionaItem (req: Request, res: Response){
    
    try{
        const novoItem = paoService.adicionarItem(req.body)
        res.status(200).json(
            {
                message:"Item adicionado!",
                Item: novoItem
            }
        )
    } catch (error:any){
        res.status(400).json({message: error.message})
    }
}

/*
===== DELETA QUANTIDADE DE DETERMINADO ITEM DO ESTOQUE (a fazer) =====
*/ 

export function deletaEstoque (req: Request, res: Response){
    try{
        const item = paoService.deletarEstoque(req.body)
        res.status(200).json(
            {
                message: "Estoque alterado com sucesso!",
                Item: item
            }
        )
    } catch (error: any){
        res.status(400).json({message: error.message})
    }
}

/*
=========  ADICIONA QUANTIDADE DE DETERMINADO ITEM AO ESTOQUE ========
*/ 

export function adicionaEstoque (req: Request, res: Response){
    try{
        const item = paoService.adicionarEstoque(req.body)
        res.status(200).json(
            {
                message: "Estoque alterado com sucesso!",
                Item: item
            }
        )
    } catch (error: any){
        res.status(400).json({message: error.message})
    }
}

/*
======================== BUSCA ITEM DO ESTOQUE  ======================
*/ 

export function buscaItem (req: Request, res: Response){
    try{
        const item = paoService.buscaItem(req.params.id)
        res.status(200).json(
            {
                message: "Produto Encontrado: ", item
            }
        )
    } catch (error:any) {
        res.status(400).json({message: error.message})
    }
}

/*





===================================================================
=============================           ===========================
=============================   VENDA   ===========================
=============================           ===========================
===================================================================






*/ 
/*
======================== BUSCA TODAS AS VENDAS  ======================
*/ 
export function criaVenda (req: Request, res: Response){
    try {
        const venda = paoService.criaVenda(req.body);
        res.status(201).json(
            {
                mensagem: "Venda Cadastrada com sucesso!",
                Venda: venda
            }
            );
    } catch (error: any) {
        res.status(400).json({ message: error.message});
    }
}
/*
======================== BUSCA VENDA POR ID  ======================
*/ 
export function recuperaVendaPorId (req: Request, res: Response){
    try {
        const venda = paoService.recuperaVendaPorId(req.params.id);

        if(venda){
            res.status(201).json(
                {
                    mensagem: "Venda encontrada!",
                    modalidade: venda
                }
                );
        }else{
            res.status(404).json({mensagem: "Esta venda não foi encontrada, verifique o ID e tente novamente"})
        }
    } catch (error: any) {
        res.status(400).json({message: error.message,});
    }
}