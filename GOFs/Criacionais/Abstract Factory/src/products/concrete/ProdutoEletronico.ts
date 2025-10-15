import IProduto from "../interfaces/IProduto";

export default class ProdutoEletronico implements IProduto {
    public categoria: string = "Eletrônicos";
    constructor(
        public nome: string,
        public descricao: string,
        public preco: number
    ) {}

    exibirDetalhes(): void {
        console.log(`Eletrônico: ${this.nome} - R$${this.preco}`);
    }
}