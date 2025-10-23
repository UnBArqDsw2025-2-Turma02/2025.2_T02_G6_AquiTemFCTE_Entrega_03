import Produto from "./Produto";

export default class ProdutoVenda extends Produto {
  constructor(nome: string, descricao: string) {
    super(nome, descricao);
    this.setModalidade("Venda");
  }
}
