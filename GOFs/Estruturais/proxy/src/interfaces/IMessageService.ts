import { IServiceResponse } from './IServiceResponse';

export interface IMessageService {
	sendMessage(senderEmail: string, receiverEmail: string, message: string): IServiceResponse;
}

