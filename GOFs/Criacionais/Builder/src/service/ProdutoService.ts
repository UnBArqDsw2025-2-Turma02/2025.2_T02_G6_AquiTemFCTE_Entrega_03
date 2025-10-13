import { Router } from "express";
import ProdutoBuilder from "../class/ProdutoBuilder";
import ProdutoVendaBuilder from "../class/ProdutoVendaBuilder";
import ProdutoTrocaBuilder from "../class/ProdutoTrocaBuilder";
import GerenciamentoDeCriacaoProdutos from "../class/GerenciadorDeCriacaoProdutos";

const router = Router();

export default class ProdutoService {
  public router: Router;

  constructor() {
    this.router = router;
  }

  public criarProdutoBasico(): void {
    this.router.post("/basic", (req, res) => {
      const produto = req.body;

      const produtoBuilder: ProdutoBuilder =
        produto.tipo === "Troca"
          ? new ProdutoTrocaBuilder()
          : new ProdutoVendaBuilder();

      const director = new GerenciamentoDeCriacaoProdutos();
      director.setProdutoBuilder(produtoBuilder);

      director.construirProduto(produto.nome, produto.descricao);
      const novoProduto = director.getProduto();

      res.status(201).send(novoProduto);
    });
  }

  public criarProdutoCompleto(): void {
    this.router.post("/full", (req, res) => {
      const produto = req.body;

      const produtoBuilder: ProdutoBuilder =
        produto.tipo === "Troca"
          ? new ProdutoTrocaBuilder()
          : new ProdutoVendaBuilder();

      const director = new GerenciamentoDeCriacaoProdutos();
      director.setProdutoBuilder(produtoBuilder);

      director.construirProdutoCompleto(
        produto.nome,
        produto.descricao,
        produto.imagem,
        produto.preco,
        produto.categoria
      );

      const novoProduto = director.getProdutoCompleto();

      res.status(200).send(novoProduto);
    });
  }
}
