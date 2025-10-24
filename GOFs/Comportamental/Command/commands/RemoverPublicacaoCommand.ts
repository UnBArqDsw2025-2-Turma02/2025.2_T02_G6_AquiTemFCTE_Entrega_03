import { Command } from "./Command";
import { PublicacaoService } from "../services/PublicacaoService";
import { Publicacao } from "../models/Publicacao";

export class RemoverPublicacaoCommand implements Command {
  constructor(private service: PublicacaoService, private publicacao: Publicacao) {}

  execute(): void {
    this.service.removerPublicacao(this.publicacao);
  }

  undo(): void {
    console.log("↩️ (Simulação) Publicação restaurada!");
  }
}
