import InterfaceProduto from "../interfaces/InterfaceProduto";

export default class ProdutoVestuario implements InterfaceProduto {
    public categoria: string = "Vestuário";

    constructor(
        public nome: string,
        public descricao: string,
        public preco: number
    ) {}

    /**
     * Exibe os detalhes específicos de um item de vestuário.
     */
    public exibirDetalhes(): void {
        console.log(`Item de Vestuário: ${this.nome} (${this.categoria}) - R$${this.preco}`);
    }
}