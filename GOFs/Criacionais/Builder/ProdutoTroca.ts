import Produto from "./Produto";

class ProdutoTroca extends Produto {
  private itensDeInteresseParaTroca: string[];

  constructor(nome: string, descricao: string) {
    super(nome, descricao);
  }

  setItensDeInteresseParaTroca(itens: string): void { 
    this.itensDeInteresseParaTroca.push(itens);
  }
}

export default ProdutoTroca;
