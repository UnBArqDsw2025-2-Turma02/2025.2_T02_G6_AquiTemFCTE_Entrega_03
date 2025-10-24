import { Command } from "../commands/Command";

export class PublicacaoInvoker {
  private historico: Command[] = [];

  executar(command: Command): void {
    command.execute();
    this.historico.push(command);
  }

  desfazerUltimo(): void {
    const ultimo = this.historico.pop();
    if (ultimo) ultimo.undo();
  }
}
