export default interface InterfaceProduto {
    nome: string;
    descricao: string;
    preco: number;
    categoria: string;

    exibirDetalhes(): void;
}