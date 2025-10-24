export class Produto {
    private nome: string;
    private descricao: string;
    private preco: number;
    private modalidade: string;
    private imagem: string[];
    private estado: boolean;

    constructor(nome: string, descricao: string) {
        this.nome = nome;
        this.descricao = descricao;
        this.preco = 0;
        this.modalidade = "";
        this.imagem = [];
        this.estado = false;
    }

    public setNome(nome: string): void {
        this.nome = nome;
    }

    public setDescricao(descricao: string): void {
        this.descricao = descricao;
    }

    public setModalidade(modalidade: string): void {
        this.modalidade = modalidade;
    }

    public setPreco(preco: number): void {
        this.preco = preco;
    }

    public setImagem(imagem: string[]): void {
        this.imagem = imagem;
    }

    public setEstado(estado: boolean): void {
        this.estado = estado;
    }

    public getDados(): void {
        console.log(`Produto: ${this.nome}`);
        console.log(`Descrição: ${this.descricao}`);
        console.log(`Preço: ${this.preco}`);
        console.log(`Modalidade: ${this.modalidade}`);
        console.log(`Imagens: ${this.imagem.join(', ')}`);
        console.log(`Estado: ${this.estado ? 'Ativo' : 'Inativo'}`);
    }

    public getNome(): string {
        return this.nome;
    }

    public getDescricao(): string {
        return this.descricao;
    }

    public getPreco(): number {
        return this.preco;
    }

    public getModalidade(): string {
        return this.modalidade;
    }

    public getImagem(): string[] {
        return this.imagem;
    }

    public getEstado(): boolean {
        return this.estado;
    }
}
