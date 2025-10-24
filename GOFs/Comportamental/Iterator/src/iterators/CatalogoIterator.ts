import { ProdutoIterator } from "../interfaces/ProdutoIterator";
import { Produto } from "../models/Produto";

export class CatalogoIterator implements ProdutoIterator {
    private produtos: Produto[];
    private posicao: number;

    constructor(produtos: Produto[]) {
        this.produtos = produtos;
        this.posicao = 0;
    }

    public hasNext(): boolean {
        return this.posicao < this.produtos.length;
    }

    public next(): Produto {
        if (!this.hasNext()) {
            throw new Error("Não há mais produtos no catálogo");
        }
        return this.produtos[this.posicao++];
    }
}
