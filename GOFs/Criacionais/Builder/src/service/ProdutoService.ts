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
      try {
        const produto = req.body;

        if (!produto.tipo || (produto.tipo !== "Troca" && produto.tipo !== "Venda")) {
          res.status(400).send({ error: "Tipo de produto inválido. Use 'Troca' ou 'Venda'." });
          return;
        }

        const produtoBuilder: ProdutoBuilder =
          produto.tipo === "Troca"
            ? new ProdutoTrocaBuilder()
            : new ProdutoVendaBuilder();

        const director = new GerenciamentoDeCriacaoProdutos();
        director.setProdutoBuilder(produtoBuilder);

        director.construirProduto(produto.nome, produto.descricao);
        const novoProduto = director.getProduto();

        res.status(201).send(novoProduto);
      } catch (error) {
        res.status(500).send({ error: (error as Error).message });
      }
    });
  }

  public criarProdutoCompleto(): void {
    this.router.post("/full", (req, res) => {
      try {
        const produto = req.body;

        if (!produto.tipo || (produto.tipo !== "Troca" && produto.tipo !== "Venda")) {
          res.status(400).send({ error: "Tipo de produto inválido. Use 'Troca' ou 'Venda'." });
          return;
        }

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
          produto.categoria,
          produto.itensDeInteresseParaTroca
        );

        const novoProduto = director.getProdutoCompleto();

        res.status(200).send(novoProduto);
      } catch (error) {
        res.status(500).send({ error: (error as Error).message });
      } 
    });
  }
}
