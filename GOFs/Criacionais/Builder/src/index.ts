import express from "express";
import ProdutoService from "./service/ProdutoService";

const produtoService = new ProdutoService();
produtoService.criarProdutoBasico();
produtoService.criarProdutoCompleto();

const port = 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/produto", produtoService.router);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
  console.log(
    `\nUTILIZE O POSTMAN OU INSOMNIA PARA TESTAR AS REQUISIÇÕES POST:\n- http://localhost:${port}/produto/basic\n- http://localhost:${port}/produto/full\n`
  );

  console.log('EXEMPLO DE REQUISIÇÃO PARA PRODUTO BÁSICO (BODY):\n{\n  "nome": "Camiseta",\n  "descricao": "Camiseta de algodão tamanho M",\n  "tipo": "Venda"\n}\n');
  console.log(
    'EXEMPLO DE REQUISIÇÃO PARA PRODUTO COMPLETO (BODY):\n{\n  "nome": "Camiseta",\n  "descricao": "Camiseta de algodão tamanho M",\n  "imagem": "http://exemplo.com/imagem.jpg",\n  "preco": 49.90,\n  "categoria": "Roupas",\n  "tipo": "Troca",\n  "itensDeInteresseParaTroca": ["Produto A", "Produto B"]\n}\n'
  );
});
