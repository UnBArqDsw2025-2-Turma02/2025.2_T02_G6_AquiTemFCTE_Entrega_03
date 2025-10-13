export default abstract class Produto {
  private imagemProduto: string[];
  private nomeProduto: string;
  private descricaoProduto: string;
  private precoProduto: number;
  private categoriaProduto: string;
  private estadoProduto: boolean;
  private modalidadeProduto: string;

  constructor(nome: string, descricao: string, modalidade?: string) {
    this.imagemProduto = [];
    this.nomeProduto = nome;
    this.descricaoProduto = descricao;
    this.precoProduto = 0;
    this.categoriaProduto = "";
    this.estadoProduto = false;
    this.modalidadeProduto = modalidade || "";
  }

  public setImagemProduto(imagem: string): void {
    this.imagemProduto.push(imagem);
  }

  public setNomeProduto(nome: string): void {
    this.nomeProduto = nome;
  }

  public setDescricaoProduto(descricao: string): void {
    this.descricaoProduto = descricao;
  }

  public setPrecoProduto(preco: number): void {
    this.precoProduto = preco;
  }

  public setCategoriaProduto(categoria: string): void {
    this.categoriaProduto = categoria;
  }

  public setModalidadeProduto(modalidade: string): void {
    this.modalidadeProduto = modalidade;
  }

  public setVendido(): void {
    this.estadoProduto = true;
  }

  public getNomeProduto(): string {
    return this.nomeProduto;
  }

  public getDescricaoProduto(): string {
    return this.descricaoProduto;
  }

  public getModalidade(): string {
    return this.modalidadeProduto;
  }

  public getProdutoCompleto(): any {
    return {
      imagemProduto: this.imagemProduto,
      nomeProduto: this.nomeProduto,
      descricaoProduto: this.descricaoProduto,
      precoProduto: this.precoProduto,
      categoriaProduto: this.categoriaProduto,
      estadoProduto: this.estadoProduto,
      modalidadeProduto: this.modalidadeProduto
    }
  }
}