import AbstractProdutoFactory from "../interfaces/AbstractProdutoFactory";
import InterfaceProduto from "../../products/interfaces/InterfaceProduto";
import InterfaceAcessorio from "../../products/interfaces/InterfaceAcessorio";
import ProdutoVestuario from "../../products/concrete/ProdutoVestuario";
import TabelaDeMedidas from "../../products/concrete/acessorios/TabelaDeMedidas";

export default class VestuarioFactory implements AbstractProdutoFactory {
    /**
     * Cria uma instância de um produto do tipo Vestuário.
     * @param nome O nome do produto.
     * @param descricao A descrição do produto.
     * @param preco O preço do produto.
     * @returns Uma instância de IProduto.
     */
    public criarProduto(nome: string, descricao: string, preco: number): InterfaceProduto {
        return new ProdutoVestuario(nome, descricao, preco);
    }

    /**
     * Cria uma instância do acessório correspondente a um produto de Vestuário.
     * @returns Uma instância de IAcessorio.
     */
    public criarAcessorio(): InterfaceAcessorio {
        return new TabelaDeMedidas();
    }
}