import {Produto} from "./Produto";

export class Aluno{
    constructor(public nome: string, public email: string){}

    publicarProduto(produto: Produto): void{
        console.log(`${this.nome} publicou o produto ${produto.nome}`);
    }
}