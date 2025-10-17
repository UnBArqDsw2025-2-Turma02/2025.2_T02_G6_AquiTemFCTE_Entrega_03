import { IMessageService } from './IMessageService';
import { IServiceResponse } from './IServiceResponse';

export class MessageServiceProxy implements IMessageService {
  private realService: IMessageService;

  constructor(realService: IMessageService) {
    this.realService = realService;
  }

  public sendMessage(senderEmail: string, receiverEmail: string, message: string): IServiceResponse {
    console.log('[Proxy] Interceptando a solicitação...');

    if (!this.isInstitutionalEmail(senderEmail)) {
      console.log('[Proxy] BLOQUEADO: E-mail não institucional.');
      return {
        success: false,
        message: 'Apenas e-mails institucionais podem enviar mensagens.'
      };
    }

    console.log('[Proxy] Acesso permitido. Encaminhando ao serviço real...');
    return this.realService.sendMessage(senderEmail, receiverEmail, message);
  }

  private isInstitutionalEmail(email: string): boolean {
    return email.endsWith('@universidade.edu.br');
  }
}
