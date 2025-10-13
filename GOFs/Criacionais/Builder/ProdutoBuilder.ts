import Produto from "./Produto";

export class ProdutoBuilder {
  protected produto?: Produto;

  criarNovoProduto(nome: string, descricao: string): this {
    this.produto = new Produto(nome, descricao);
    return this;
  }

  buildImagem(foto: string): this {
    if (!this.produto) throw new Error("Chame criarNovoProduto primeiro");
    this.produto.setImagemProduto(foto);
    return this;
  }

  buildPreco(preco: number): this {
    if (!this.produto) throw new Error("Chame criarNovoProduto primeiro");
    this.produto.setPrecoProduto(preco);
    return this;
  }

  buildCategoria(categoria: string): this {
    if (!this.produto) throw new Error("Chame criarNovoProduto primeiro");
    this.produto.setCategoriaProduto(categoria);
    return this;
  }

  buildVendido(): this {
    if (!this.produto) throw new Error("Chame criarNovoProduto primeiro");
    this.produto.setVendido();
    return this;
  }

  buildModalidade(modalidade: string): this {
    if (!this.produto) throw new Error("Chame criarNovoProduto primeiro");
    this.produto.setModalidadeProduto(modalidade);
    return this;
  }

  getProduto(): Produto {
    if (!this.produto) throw new Error("Produto não foi criado");
    const result = this.produto;
    this.produto = undefined;
    return result;
  }
}