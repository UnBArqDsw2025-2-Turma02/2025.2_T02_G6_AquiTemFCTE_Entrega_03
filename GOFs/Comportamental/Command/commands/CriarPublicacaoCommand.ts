import { Command } from "./Command";
import { PublicacaoService } from "../services/PublicacaoService";
import { Aluno } from "../models/Aluno";
import { Produto } from "../models/Produto";
import { Publicacao } from "../models/Publicacao";

export class CriarPublicacaoCommand implements Command {
  private publicacao?: Publicacao;

  constructor(
    private service: PublicacaoService,
    private aluno: Aluno,
    private produto: Produto
  ) {}

  execute(): void {
    this.publicacao = this.service.criarPublicacao(this.aluno, this.produto);
  }

  undo(): void {
    if (this.publicacao) {
      this.service.removerPublicacao(this.publicacao);
      console.log("↩️ Ação desfeita: publicação removida.");
    }
  }
}
