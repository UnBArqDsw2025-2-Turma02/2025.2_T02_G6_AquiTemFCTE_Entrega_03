import Produto from "./Produto";

export default class ProdutoTroca extends Produto {
  private listaItemInteresse: String[];

  constructor(
    nome: string,
    descricao: string,
    listaItemInteresse: String[]
  ) {
    super(nome, descricao);
    this.listaItemInteresse = listaItemInteresse;
    this.setModalidade("Troca");
  }

  getListaItemInteresse(): String[] {
    return this.listaItemInteresse;
  }

  setListaItemInteresse(listaItemInteresse: String[]): void {
    this.listaItemInteresse = listaItemInteresse;
  }

  getDados(): void {
    super.getDados();
    console.log(`Itens de Interesse: ${this.listaItemInteresse.join(", ")}`);
  }
}