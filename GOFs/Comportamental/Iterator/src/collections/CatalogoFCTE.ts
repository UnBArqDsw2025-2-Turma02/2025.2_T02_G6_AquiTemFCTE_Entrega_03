import { ColecaoProdutos } from "../interfaces/ColecaoProdutos";
import { ProdutoIterator } from "../interfaces/ProdutoIterator";
import { CatalogoIterator } from "../iterators/CatalogoIterator";
import { Produto } from "../models/Produto";

export class CatalogoFCTE implements ColecaoProdutos {
    private produtos: Produto[];

    constructor() {
        this.produtos = [];
    }

    public adicionarProduto(produto: Produto): void {
        this.produtos.push(produto);
    }

    public criarIterator(): ProdutoIterator {
        return new CatalogoIterator(this.produtos);
    }
}
