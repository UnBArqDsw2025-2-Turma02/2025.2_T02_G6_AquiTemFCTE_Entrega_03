import { IMessageService } from '../interfaces/IMessageService';
import { IServiceResponse } from '../interfaces/IServiceResponse';

export class RealMessageService implements IMessageService {
	public sendMessage(senderEmail: string, receiverEmail: string, message: string): IServiceResponse {
		console.log(`[RealService] Enviando mensagem de ${senderEmail} para ${receiverEmail}...`);

		return {
			success: true,
			message: 'Mensagem enviada com sucesso.'
		};
	}
}

