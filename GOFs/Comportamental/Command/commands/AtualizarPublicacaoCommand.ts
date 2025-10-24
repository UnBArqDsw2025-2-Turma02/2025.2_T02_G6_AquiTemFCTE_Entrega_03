import { Command } from "./Command";
import { PublicacaoService } from "../services/PublicacaoService";
import { Publicacao } from "../models/Publicacao";
import { StatusEnum } from "../models/enums";

export class AtualizarPublicacaoCommand implements Command {
  constructor(
    private service: PublicacaoService,
    private publicacao: Publicacao,
    private novoStatus: StatusEnum
  ) {}

  execute(): void {
    this.service.atualizarPublicacao(this.publicacao, this.novoStatus);
  }

  undo(): void {
    this.service.atualizarPublicacao(this.publicacao, StatusEnum.Disponivel);
    console.log("↩️ Ação desfeita: status voltou para disponível.");
  }
}
