import express from "express";
import ProdutoService from "./service/ProdutoService";

const produtoService = new ProdutoService();
produtoService.criarProdutoBasico();
produtoService.criarProdutoCompleto();

const port = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/produto", produtoService.router);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
  console.log(
    `Visualize o resultado da criação de um Produto em http://localhost:${port}/produto`
  );
});
