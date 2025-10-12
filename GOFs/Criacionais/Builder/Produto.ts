class Produto {
  private imagemProduto: string[];
  private nomeProduto: string;
  private descricaoProduto: string;
  private precoProduto: number;
  private categoriaProduto: string;
  private estadoProduto: boolean;
  private modalidadeProduto: string;

  constructor(nome: string, descricao: string) {
    this.imagemProduto = [];
    this.nomeProduto = nome;
    this.descricaoProduto = descricao;
    this.precoProduto = 0;
    this.categoriaProduto = '';
    this.estadoProduto = false;
    this.modalidadeProduto = '';
  }

  setImagemProduto(imagem: string): void { 
    this.imagemProduto.push(imagem);
  }

  setNomeProduto(nome: string): void { 
    this.nomeProduto = nome;
  }

  setDescricaoProduto(descricao: string): void { 
    this.descricaoProduto = descricao;
  }

  setPrecoProduto(preco: number): void { 
    this.precoProduto = preco;
  }

  setCategoriaProduto(categoria: string): void { 
    this.categoriaProduto = categoria;
  }

  setModalidadeProduto(modalidade: string): void { 
    this.modalidadeProduto = modalidade;
  }

  setVendido(): void {
    this.estadoProduto = true;
  }
}

export default Produto;