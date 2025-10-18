import type Catalogo from "./Catalogo";

export default class Categoria implements Catalogo {
  private nome: string;
  private produtos: Catalogo[];

  constructor(nome: string) {
    this.nome = nome;
    this.produtos = [];
  }

  setNome(nome: string): void {
    this.nome = nome;
  }

  getNome(): string {
    return this.nome;
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
      console.log(`Categoria: ${this.nome}`);
      produto.getDados();
    });
  }
}