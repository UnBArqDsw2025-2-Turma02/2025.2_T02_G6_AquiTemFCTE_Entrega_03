export default interface IProduto {
    nome: string;
    descricao: string;
    preco: number;
    categoria: string;

    exibirDetalhes(): void;
}