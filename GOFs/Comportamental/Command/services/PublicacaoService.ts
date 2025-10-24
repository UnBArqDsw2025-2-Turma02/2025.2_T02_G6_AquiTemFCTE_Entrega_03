import { Aluno } from "../models/Aluno";
import { Produto } from "../models/Produto";
import { Publicacao } from "../models/Publicacao";
import { StatusEnum } from "../models/enums";

export class PublicacaoService {
  private publicacoes: Publicacao[] = [];

  criarPublicacao(aluno: Aluno, produto: Produto): Publicacao {
    const publicacao = new Publicacao(produto, aluno);
    this.publicacoes.push(publicacao);
    aluno.publicarProduto(produto);
    console.log("✅ Publicação criada com sucesso!");
    return publicacao;
  }

  atualizarPublicacao(publicacao: Publicacao, novoStatus: StatusEnum): void {
    publicacao.mudarStatus(novoStatus);
    console.log("🔄 Publicação atualizada!");
  }

  removerPublicacao(publicacao: Publicacao): void {
    publicacao.mudarStatus(StatusEnum.Indisponivel);
    console.log("❌ Publicação removida!");
  }
}
