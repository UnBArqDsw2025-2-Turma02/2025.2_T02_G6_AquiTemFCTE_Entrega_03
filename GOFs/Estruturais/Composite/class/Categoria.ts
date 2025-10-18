import type Catalogo from "./Catalogo";

export default class Categoria implements Catalogo {
  private nome: string;
  private catalogos: Catalogo[];

  constructor(nome: string) {
    this.nome = nome;
    this.catalogos = [];
  }

  setNome(nome: string): void {
    this.nome = nome;
  }

  getNome(): string {
    return this.nome;
  }

  adicionarCatalogo(catalogo: Catalogo): void {
    this.catalogos.push(catalogo);
  }

  removerCatalogo(catalogo: Catalogo): void {
    const index = this.catalogos.indexOf(catalogo);
    if (index !== -1) {
      this.catalogos.splice(index, 1);
    }
  }

  getDados(): void {
    this.catalogos.forEach((catalogo) => {
      console.log(`Categoria: ${this.nome}`);
      catalogo.getDados();
    });
  }
}