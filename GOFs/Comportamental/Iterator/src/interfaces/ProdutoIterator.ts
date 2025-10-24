import { Produto } from "../models/Produto";

export interface ProdutoIterator {
    hasNext(): boolean;
    next(): Produto;
}
