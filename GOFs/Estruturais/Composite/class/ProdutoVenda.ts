import Produto from "./Produto";

export default class ProdutoVenda extends Produto {
  constructor(nome: string, descricao: string, modalidade: string) {
    super(nome, descricao, modalidade);
  }
}
