import Produto from "./Produto";

export default class ProdutoTroca extends Produto {
  private itensDeInteresseParaTroca!: string[];

  constructor(nome: string, descricao: string, modalidade?: string) {
    super(nome, descricao, modalidade);
  }

  public setItensDeInteresseParaTroca(itens: string[]): void {
    this.itensDeInteresseParaTroca = itens;
  }
}