import { it } from "node:test";
import ProdutoBuilder from "./ProdutoBuilder";
import ProdutoTroca from "./ProdutoTroca";

export default class ProdutoTrocaBuilder implements ProdutoBuilder {
  protected produto?: ProdutoTroca;

  constructor() {
    this.produto = undefined;
  }

  public criarNovoProduto(nome: string, descricao: string): void {
    this.produto = new ProdutoTroca(nome, descricao, "Troca");
  }

  public criarNovoProdutoCompleto(
    nome: string,
    descricao: string,
    imagem: string,
    preco: number,
    categoria: string,
    itemInteresse: string[]
  ): void {
    this.produto = new ProdutoTroca(nome, descricao, "Troca");
    this.buildImagem(imagem);
    this.buildPreco(preco);
    this.buildCategoria(categoria);
    this.buildItensDeInteresseParaTroca(itemInteresse);
  }

  public getProduto(): ProdutoTroca | any {
    if (!this.produto) return {} as ProdutoTroca;
    return {
      nomeProduto: this.produto.getNomeProduto(),
      descricaoProduto: this.produto.getDescricaoProduto(),
      modalidadeProduto: this.produto.getModalidade(),
    };
  }

  public getProdutoCompleto(): ProdutoTroca {
    if (!this.produto) return {} as ProdutoTroca;
    return this.produto;
  }

  public buildVendido(): void {
    if (!this.produto) throw new Error("Chame criarNovoProduto primeiro");
    this.produto.setVendido();
  }

  public buildImagem(foto: string): void {
    if (!this.produto) throw new Error("Chame criarNovoProduto primeiro");
    this.produto.setImagemProduto(foto);
  }

  public buildPreco(preco: number): void {
    if (!this.produto) throw new Error("Chame criarNovoProduto primeiro");
    this.produto.setPrecoProduto(preco);
  }

  public buildCategoria(categoria: string): void {
    if (!this.produto) throw new Error("Chame criarNovoProduto primeiro");
    this.produto.setCategoriaProduto(categoria);
  }

  public buildModalidade(modalidade: string): void {
    if (!this.produto) throw new Error("Chame criarNovoProduto primeiro");
    this.produto.setModalidadeProduto(modalidade);
  }

  public buildItensDeInteresseParaTroca(itens: string[]): void {
    if (!this.produto) throw new Error("Chame criarNovoProduto primeiro");
    if (!itens || itens.length === 0) throw new Error("Em trocas, a lista de itens de interesse não pode ser vazia");
    this.produto.setItensDeInteresseParaTroca(itens);
  }
}
