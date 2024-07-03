import express from "express";
import {cadastraPao, listaPao, alteraPao, deletaPao, buscaPao, adicionaItem, listarEstoque, buscaItem, adicionaEstoque, deletaEstoque, recuperaVendaPorId, criaVenda} from "./controller/PadariaController";

const padaria = express();
const PORT = process.env.PORT ?? 3040;
padaria.use(express.json());

function logInfo(){
    console.log(`Aou en execução no URL: http:localhost:${PORT}`);
}

//modalidade
padaria.get("/api/modalidade/todas", listaPao);
padaria.post("/api/modalidade", cadastraPao);
padaria.put("/api/modalidade", alteraPao);
padaria.delete("/api/modalidade", deletaPao);
padaria.get("/api/modalidade/:id", buscaPao);

//estoque
padaria.post("/api/estoque", adicionaItem);
padaria.get("/api/estoque/todos", listarEstoque);
padaria.get("/api/estoque/:id", buscaItem);
padaria.put("/api/estoque", adicionaEstoque);
padaria.delete("/api/estoque", deletaEstoque);

//venda
padaria.post("/api/venda", criaVenda)
padaria.get("/api/venda/:id", recuperaVendaPorId);

padaria.listen(PORT, logInfo)
