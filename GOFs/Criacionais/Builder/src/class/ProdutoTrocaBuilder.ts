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
    this.buildInformacoesAdicionais(imagem, preco, categoria, itemInteresse);
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

  public buildInformacoesAdicionais(foto: string, preco: number, categoria: string, itemInteresse: string[]): void {
    if (!this.produto) throw new Error("Chame criarNovoProduto primeiro");
    if (!itemInteresse || itemInteresse.length === 0) throw new Error("Em trocas, a lista de itens de interesse não pode ser vazia");
    this.produto.setImagemProduto(foto);
    this.produto.setPrecoProduto(preco);
    this.produto.setCategoriaProduto(categoria);
    this.produto.setItensDeInteresseParaTroca(itemInteresse);
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
