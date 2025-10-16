import InterfaceProduto from "../interfaces/InterfaceProduto";

export default class ProdutoEletronico implements InterfaceProduto {
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