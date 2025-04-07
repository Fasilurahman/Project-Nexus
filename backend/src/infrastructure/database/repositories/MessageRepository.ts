import { IMessageRepository } from "../../../domain/repositories/IMessageRepository";
import { MessageModel } from "../models/MessageModal";
import mongoose from "mongoose";
import { ChatRepository } from "./ChatRepository";

export class MessageRepository implements IMessageRepository {
    private chatRepository: ChatRepository;

    constructor() {
        this.chatRepository = new ChatRepository();
    }

    async createMessage(chatId: string, sender: string, content?: string, fileUrl?: string) {
        if (!mongoose.Types.ObjectId.isValid(chatId) || !mongoose.Types.ObjectId.isValid(sender)) {
            return null;
        }

        const message = new MessageModel({ 
            chatId, 
            sender, 
            content : content || '',
            fileUrl: fileUrl || ''
        });
        
        const savedMessage = await message.save();
        await this.chatRepository.addMessageToChat(chatId, savedMessage.id.toString());
        
        return await MessageModel.findById(savedMessage._id).populate('sender', 'name email profilePic');
    }

    async getMessagesByChatId(chatId: string){
        if( !mongoose.Types.ObjectId.isValid(chatId) ){
            return null;
        }
        return await MessageModel.find({chatId})
            .populate('sender', 'name email profilePic')
            .sort({createdAt: 1});
    }
}