import 'reflect-metadata';
import { Container } from "inversify";
import { TYPES } from "./types";
import { ChatController } from '../../presentation/controllers/ChatController';
import { IChatRepository } from "../../domain/repositories/IChatRepository";
import { ChatRepository } from "../database/repositories/ChatRepository";
import { IMessageRepository } from "../../domain/repositories/IMessageRepository";
import { MessageRepository } from "../database/repositories/MessageRepository";
import { SocketService } from "../services/socketService";

const container = new Container();

container.bind<IChatRepository>(TYPES.ChatRepository).to(ChatRepository);
container.bind<IMessageRepository>(TYPES.MessageRepository).to(MessageRepository);
container.bind<SocketService>(TYPES.SocketService).to(SocketService);
container.bind<ChatController>(TYPES.ChatController).to(ChatController);

export default container;