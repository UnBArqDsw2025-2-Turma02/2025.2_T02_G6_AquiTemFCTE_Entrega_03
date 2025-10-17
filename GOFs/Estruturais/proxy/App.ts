import { IMessageService } from './IMessageService';
import { RealMessageService } from './RealMessageService';
import { MessageServiceProxy } from './MessageServiceProxy';

class App {
  public static main(): void {
    const realService = new RealMessageService();
    const proxyService: IMessageService = new MessageServiceProxy(realService);

    console.log('--- Tentativa 1: Usuário Válido ---');
    const response1 = proxyService.sendMessage(
      'aluno@universidade.edu.br',
      'colega@universidade.edu.br',
      'Olá, tudo bem?'
    );
    console.log('Resultado:', response1);

    console.log('\n--- Tentativa 2: Usuário Inválido ---');
    const response2 = proxyService.sendMessage(
      'externo@gmail.com',
      'colega@universidade.edu.br',
      'Posso comprar seu livro?'
    );
    console.log('Resultado:', response2);
  }
}

App.main();
