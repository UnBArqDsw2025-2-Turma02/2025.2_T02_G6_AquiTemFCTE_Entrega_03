import { IMessageService } from '../interfaces/IMessageService';
import { IServiceResponse } from '../interfaces/IServiceResponse';

export class MessageServiceProxy implements IMessageService {
  private realService: IMessageService;
  private messageCounts: Map<string, number> = new Map();
  private messagesByRecipient: Map<string, Map<string, number>> = new Map();
  private accountCreationDates: Map<string, Date> = new Map();

  constructor(realService: IMessageService) {
    this.realService = realService;
    this.initializeMockData();
  }

  private initializeMockData(): void {
    this.accountCreationDates.set('aluno@universidade.edu.br', new Date(Date.now() - 48 * 60 * 60 * 1000));
    this.accountCreationDates.set('novato@universidade.edu.br', new Date(Date.now() - 12 * 60 * 60 * 1000));
    this.accountCreationDates.set('spammer@universidade.edu.br', new Date(Date.now() - 72 * 60 * 60 * 1000));
  }

  public sendMessage(senderEmail: string, receiverEmail: string, message: string): IServiceResponse {
    console.log('[Proxy] Interceptando a solicitação de envio de mensagem...');

    if (!this.isAccountOldEnough(senderEmail)) {
      console.log('[Proxy] BLOQUEADO: Conta muito recente (mínimo 24h).');
      return {
        success: false,
        message: 'Sua conta deve ter pelo menos 24 horas para enviar mensagens.'
      };
    }

    if (!this.checkDailyLimit(senderEmail)) {
      console.log('[Proxy] BLOQUEADO: Limite diário de mensagens excedido.');
      return {
        success: false,
        message: 'Você atingiu o limite de 20 mensagens por dia. Tente novamente amanhã.'
      };
    }

    if (!this.checkRecipientLimit(senderEmail, receiverEmail)) {
      console.log('[Proxy] BLOQUEADO: Limite de mensagens para este destinatário excedido.');
      return {
        success: false,
        message: 'Você atingiu o limite de 5 mensagens para este destinatário hoje.'
      };
    }

    console.log('[Proxy] ✓ Validações anti-spam aprovadas. Encaminhando ao serviço real...');
    this.incrementMessageCount(senderEmail, receiverEmail);
    return this.realService.sendMessage(senderEmail, receiverEmail, message);
  }

  private isAccountOldEnough(email: string): boolean {
    const creationDate = this.accountCreationDates.get(email);
    if (!creationDate) return false;
    
    const hoursSinceCreation = (Date.now() - creationDate.getTime()) / (1000 * 60 * 60);
    return hoursSinceCreation >= 24;
  }

  private checkDailyLimit(senderEmail: string): boolean {
    const count = this.messageCounts.get(senderEmail) || 0;
    return count < 20;
  }

  private checkRecipientLimit(senderEmail: string, receiverEmail: string): boolean {
    const recipientMap = this.messagesByRecipient.get(senderEmail);
    if (!recipientMap) return true;
    
    const count = recipientMap.get(receiverEmail) || 0;
    return count < 5;
  }

  private incrementMessageCount(senderEmail: string, receiverEmail: string): void {
    const currentCount = this.messageCounts.get(senderEmail) || 0;
    this.messageCounts.set(senderEmail, currentCount + 1);

    if (!this.messagesByRecipient.has(senderEmail)) {
      this.messagesByRecipient.set(senderEmail, new Map());
    }
    const recipientMap = this.messagesByRecipient.get(senderEmail)!;
    const recipientCount = recipientMap.get(receiverEmail) || 0;
    recipientMap.set(receiverEmail, recipientCount + 1);
  }
}

