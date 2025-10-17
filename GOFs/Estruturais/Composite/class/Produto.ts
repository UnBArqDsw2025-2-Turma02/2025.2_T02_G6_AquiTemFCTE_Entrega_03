import Catalogo from "./Catalogo";

export default abstract class Produto implements Catalogo {
  private nome: string;
  private descricao: string;
  private preco: number;
  private modalidade: string;
  private imagem: string[];
  private estado: boolean;

  constructor(nome: string, descricao: string, modalidade: string) {
    this.nome = nome;
    this.descricao = descricao;
    this.modalidade = modalidade;
    this.preco = 0;
    this.imagem = [];
    this.estado = true;
  }

  setNome(nome: string): void {
    this.nome = nome;
  }

  getNome(): string {
    return this.nome;
  }

  setDescricao(descricao: string): void {
    this.descricao = descricao;
  }

  getDescricao(): string {
    return this.descricao;
  }

  setPreco(preco: number): void {
    this.preco = preco;
  }

  getPreco(): number {
    return this.preco;
  }

  setModalidade(modalidade: string): void {
    this.modalidade = modalidade;
  }

  getModalidade(): string {
    return this.modalidade;
  }

  setImagem(imagem: string): void {
    this.imagem.push(imagem);
  }

  getImagem(): string[] {
    return this.imagem;
  }

  setEstado(estado: boolean): void {
    this.estado = estado;
  }

  getEstado(): boolean {
    return this.estado;
  }

  getDados(): void {
    console.log(`Nome: ${this.nome}`);
    console.log(`Descrição: ${this.descricao}`);
    console.log(`Preço: ${this.preco}`);
    console.log(`Modalidade: ${this.modalidade}`);
    console.log(`Imagens: ${this.imagem.join(", ")}`);
    console.log(`Estado: ${this.estado ? "Ativo" : "Inativo"}`);
  }
}