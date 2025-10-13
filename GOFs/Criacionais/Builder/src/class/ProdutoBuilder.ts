import Produto from "./Produto";

export default interface ProdutoBuilder {
  getProduto(): Produto;
  getProdutoCompleto(): Produto;
  buildVendido(): void;
  criarNovoProduto(nome: string, descricao: string): void;
  criarNovoProdutoCompleto(nome: string, descricao: string, imagem: string, preco: number, categoria: string, itemInteresse?: string[]): void;
  buildImagem(foto: string): void;
  buildPreco(preco: number): void;
  buildCategoria(categoria: string): void;
  buildModalidade(modalidade: string): void;
}