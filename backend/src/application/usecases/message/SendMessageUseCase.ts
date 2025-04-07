import mongoose from "mongoose";
import { MessageRepository } from "../../../infrastructure/database/repositories/MessageRepository";
import { SocketService } from "../../../infrastructure/services/socketService";

export class SendMessageUseCase {
    constructor(
        private messageRepository: MessageRepository,
        private socketService: SocketService
    ){}

    async execute(chatId: string, senderId: string, content: string | null, fileUrl: string | null){
        if(! senderId){
            throw new Error('User not authenticated');
        }
        if(! mongoose.Types.ObjectId.isValid(chatId)){
            throw new Error('Invalid chat id');
        }
        if(!content?.trim() && !fileUrl){
            throw new Error('Content or file is required');
        }
        const message = await this.messageRepository.createMessage(chatId,senderId,content ?? undefined,  fileUrl ?? undefined)
        if(message){
            this.socketService.notifyChatMembers(chatId,message);
        }
        return message;
    }
}