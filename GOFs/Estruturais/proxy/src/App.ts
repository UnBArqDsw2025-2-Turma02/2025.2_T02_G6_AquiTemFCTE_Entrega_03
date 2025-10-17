import { IMessageService } from './interfaces/IMessageService';
import { RealMessageService } from './services/RealMessageService';
import { MessageServiceProxy } from './services/MessageServiceProxy';

class App {
  public static main(): void {
    console.log('========================================');
    console.log('   SISTEMA ANTI-SPAM DE MENSAGENS');
    console.log('========================================\n');

    const realService = new RealMessageService();
    const proxyService: IMessageService = new MessageServiceProxy(realService);

    console.log('--- Teste 1: Usuário com conta válida (48h) ---');
    const response1 = proxyService.sendMessage(
      'aluno@universidade.edu.br',
      'professor@universidade.edu.br',
      'Olá, professor! Gostaria de trocar/comprar seu livro.'
    );
    console.log('Resultado:', response1);
    console.log('');

    console.log('--- Teste 2: Conta muito recente (12h) - BLOQUEIO ---');
    const response2 = proxyService.sendMessage(
      'novato@universidade.edu.br',
      'vendedor@universidade.edu.br',
      'Oi, tenho interesse no produto.'
    );
    console.log('Resultado:', response2);
    console.log('');

    console.log('--- Teste 3: Simulando múltiplas mensagens do mesmo usuário ---');
    for (let i = 2; i <= 6; i++) {
      console.log(`\n  Mensagem ${i} para o mesmo destinatário:`);
      const response = proxyService.sendMessage(
        'aluno@universidade.edu.br',
        'professor@universidade.edu.br',
        `Mensagem número ${i}`
      );
      console.log('  Resultado:', response.success ? '✓ Enviada' : '✗ Bloqueada');
      if (!response.success) {
        console.log('  Motivo:', response.message);
        break;
      }
    }

    console.log('\n--- Teste 4: Enviando para destinatários diferentes ---');
    const destinatarios = [
      'usuario1@universidade.edu.br',
      'usuario2@universidade.edu.br',
      'usuario3@universidade.edu.br'
    ];

    destinatarios.forEach((dest, index) => {
      console.log(`\n  Mensagem ${index + 1} para ${dest}:`);
      const response = proxyService.sendMessage(
        'aluno@universidade.edu.br',
        dest,
        'Olá! Tenho interesse no seu produto.'
      );
      console.log('  Resultado:', response.success ? '✓ Enviada' : '✗ Bloqueada');
    });

    console.log('\n========================================');
    console.log('   FIM DOS TESTES');
    console.log('========================================');
  }
}

App.main();
