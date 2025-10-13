import ProdutoBuilder from "./ProdutoBuilder";
import ProdutoVenda from "./ProdutoVenda";

export default class ProdutoVendaBuilder implements ProdutoBuilder {
  protected produto?: ProdutoVenda;

  constructor() {
    this.produto = undefined;
  }

  public criarNovoProduto(nome: string, descricao: string): void {
    this.produto = new ProdutoVenda(nome, descricao, "Venda");
  }

  public criarNovoProdutoCompleto(
    nome: string,
    descricao: string,
    imagem: string,
    preco: number,
    categoria: string
  ): void {
    this.produto = new ProdutoVenda(nome, descricao, "Venda");
    this.buildInformacoesAdicionais(imagem, preco, categoria);
  }

  public getProduto(): ProdutoVenda | any {
    if (!this.produto) return {} as ProdutoVenda;
    return {
      nomeProduto: this.produto.getNomeProduto(),
      descricaoProduto: this.produto.getDescricaoProduto(),
      modalidadeProduto: this.produto.getModalidade(),
    };
  }

  public getProdutoCompleto(): ProdutoVenda {
    if (!this.produto) return {} as ProdutoVenda;
    return this.produto;
  }

  public buildInformacoesAdicionais(
    foto: string,
    preco: number,
    categoria: string,
  ): void {
    if (!this.produto) throw new Error("Chame criarNovoProduto primeiro");
    this.produto.setImagemProduto(foto);
    this.produto.setPrecoProduto(preco);
    this.produto.setCategoriaProduto(categoria);
  }

  public buildVendido(): void {
    if (!this.produto) throw new Error("Chame criarNovoProduto primeiro");
    this.produto.setVendido();
  }

  public buildModalidade(modalidade: string): void {
    if (!this.produto) throw new Error("Chame criarNovoProduto primeiro");
    this.produto.setModalidadeProduto(modalidade);
  }
}
