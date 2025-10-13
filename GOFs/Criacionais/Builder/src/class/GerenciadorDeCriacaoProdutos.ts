import ProdutoBuilder from "./ProdutoBuilder";
import Produto from "./Produto";

export default class GerenciamentoDeCriacaoProdutos {
  private produtoBuilder!: ProdutoBuilder;

  public setProdutoBuilder(produtoBuilder: ProdutoBuilder): void {
    this.produtoBuilder = produtoBuilder;
  }

  public getProduto(): Produto {
    return this.produtoBuilder.getProduto();
  }

  public getProdutoCompleto(): Produto | any {
    return this.produtoBuilder.getProdutoCompleto();
  }

  public construirProduto(nomeProduto: string, descricaoProduto: string): void {
    this.produtoBuilder.criarNovoProduto(nomeProduto, descricaoProduto);
  }

  public construirProdutoCompleto(
    nomeProduto: string,
    descricaoProduto: string,
    imagemProduto: string,
    precoProduto: number,
    categoriaProduto: string,

  ): void {
    this.produtoBuilder.criarNovoProdutoCompleto(
      nomeProduto,
      descricaoProduto,
      imagemProduto,
      precoProduto,
      categoriaProduto
    );
  }
}
