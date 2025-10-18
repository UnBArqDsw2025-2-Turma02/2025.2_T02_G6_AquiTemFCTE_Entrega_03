import InterfaceProduto from "../../products/interfaces/InterfaceProduto";
import InterfaceAcessorio from "../../products/interfaces/InterfaceAcessorio";

export default interface InterfaceProdutoFactory {
    criarProduto(nome: string, descricao: string, preco: number): InterfaceProduto;
    criarAcessorio(): InterfaceAcessorio;
}