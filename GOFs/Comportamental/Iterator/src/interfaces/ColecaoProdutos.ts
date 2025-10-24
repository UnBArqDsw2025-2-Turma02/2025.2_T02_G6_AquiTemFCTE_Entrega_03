import { ProdutoIterator } from "./ProdutoIterator";

export interface ColecaoProdutos {
    criarIterator(): ProdutoIterator;
}
