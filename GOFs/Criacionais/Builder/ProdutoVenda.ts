import Produto from "./Produto";

class ProdutoVenda extends Produto {
  constructor(nome: string, descricao: string) {
    super(nome, descricao);
  }
}

export default ProdutoVenda;
