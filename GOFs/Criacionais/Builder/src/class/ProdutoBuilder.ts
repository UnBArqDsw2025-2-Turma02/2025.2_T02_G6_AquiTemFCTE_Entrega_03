import Produto from "./Produto";

export default interface ProdutoBuilder {
  getProduto(): Produto;
  getProdutoCompleto(): Produto;
  buildVendido(): void;
  criarNovoProduto(nome: string, descricao: string): void;
  criarNovoProdutoCompleto(nome: string, descricao: string, imagem: string, preco: number, categoria: string, itemInteresse?: string[]): void;
  buildInformacoesAdicionais(foto: string, preco: number, categoria: string, itemInteresse?: string[]): void;
  buildModalidade(modalidade: string): void;
}