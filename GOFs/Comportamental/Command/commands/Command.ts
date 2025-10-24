export interface Command {
  execute(): void;
  undo(): void; // opcional, mas útil em sistemas reais
}
