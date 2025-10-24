import { Aluno } from "./models/Aluno";
import { Produto } from "./models/Produto";
import { PublicacaoService } from "./services/PublicacaoService";
import { CriarPublicacaoCommand } from "./commands/CriarPublicacaoCommand";
import { AtualizarPublicacaoCommand } from "./commands/AtualizarPublicacaoCommand";
import { RemoverPublicacaoCommand } from "./commands/RemoverPublicacaoCommand";
import { PublicacaoInvoker } from "./invoker/PublicacaoInvoker";
import { StatusEnum } from "./models/enums";

// Simula o fluxo do app
const aluno = new Aluno("Caio", "caio@email.com");
const produto = new Produto("Violão", 500, "Instrumento usado");
const service = new PublicacaoService();
const invoker = new PublicacaoInvoker();

// 1️⃣ Criar publicação
const criarCmd = new CriarPublicacaoCommand(service, aluno, produto);
invoker.executar(criarCmd);

// 2️⃣ Atualizar status
const publicacao = service["publicacoes"][0];
const atualizarCmd = new AtualizarPublicacaoCommand(service, publicacao, StatusEnum.Indisponivel);
invoker.executar(atualizarCmd);

// 3️⃣ Remover publicação
const removerCmd = new RemoverPublicacaoCommand(service, publicacao);
invoker.executar(removerCmd);

// 4️⃣ Desfazer última ação
invoker.desfazerUltimo();
