import IProdutoFactory from "../interfaces/IProdutoFactory";
import IProduto from "../../products/interfaces/IProduto";
import IAcessorio from "../../products/interfaces/IAcessorio";
import ProdutoEletronico from "../../products/concrete/ProdutoEletronico";
import Garantia from "../../products/concrete/acessorios/Garantia";

export default class EletronicoFactory implements IProdutoFactory {
    public criarProduto(nome: string, descricao: string, preco: number): IProduto {
        return new ProdutoEletronico(nome, descricao, preco);
    }

    public criarAcessorio(): IAcessorio {
        return new Garantia();
    }
}