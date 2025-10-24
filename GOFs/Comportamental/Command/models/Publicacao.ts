import {Produto} from "./Produto";
import {Aluno} from "./Aluno";
import { StatusEnum } from "./enums";

export class Publicacao{
    private status: StatusEnum;

    constructor(public produto: Produto, public aluno: Aluno){
        this.status = StatusEnum.Disponivel;
    }

    mudarStatus(status: StatusEnum): void{
        this.status = status;
        console.log(`Status da publicação do aluno ${this.aluno.nome} do produto
            ${this.produto.nome} agora é ${status}`);
    }

    getStatus(): StatusEnum{
        return this.status;
    }
}
