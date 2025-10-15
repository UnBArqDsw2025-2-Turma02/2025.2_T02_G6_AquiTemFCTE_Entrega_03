import IProduto from "../../products/interfaces/IProduto";
import IAcessorio from "../../products/interfaces/IAcessorio";

export default interface IProdutoFactory {
    criarProduto(nome: string, descricao: string, preco: number): IProduto;
    criarAcessorio(): IAcessorio;
}