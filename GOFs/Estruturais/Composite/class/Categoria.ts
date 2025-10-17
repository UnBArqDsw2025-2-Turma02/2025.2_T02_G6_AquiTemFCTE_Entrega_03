import Catalogo from "./Catalogo";

export default class Categoria implements Catalogo {
  private produtos: Catalogo[];

  constructor() {
    this.produtos = [];
  }

  adicionarProduto(produto: Catalogo): void {
    this.produtos.push(produto);
  }

  removerProduto(produto: Catalogo): void {
    const index = this.produtos.indexOf(produto);
    if (index !== -1) {
      this.produtos.splice(index, 1);
    }
  }

  getDados(): void {
    this.produtos.forEach((produto) => {
      produto.getDados();
    });
  }
}