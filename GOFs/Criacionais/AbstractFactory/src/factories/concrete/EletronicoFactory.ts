import AbstractProdutoFactory from "../interfaces/AbstractProdutoFactory";
import InterfaceProduto from "../../products/interfaces/InterfaceProduto";
import InterfaceAcessorio from "../../products/interfaces/InterfaceAcessorio";
import ProdutoEletronico from "../../products/concrete/ProdutoEletronico";
import Garantia from "../../products/concrete/acessorios/Garantia";

export default class EletronicoFactory implements AbstractProdutoFactory {
    public criarProduto(nome: string, descricao: string, preco: number): InterfaceProduto {
        return new ProdutoEletronico(nome, descricao, preco);
    }

    public criarAcessorio(): InterfaceAcessorio {
        return new Garantia();
    }
}