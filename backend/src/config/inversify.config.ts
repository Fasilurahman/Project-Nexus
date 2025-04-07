import { Container } from "inversify";
import { UserRepository } from "../infrastructure/database/repositories/UserRepository";
import { GetAllUsersUseCase } from "../application/usecases/user/GetAllUsersUseCase";
import { BlockUserUseCase } from "../application/usecases/user/BlockUserUseCase";
import { UpdateUserUseCase } from "../application/usecases/user/UpdateUserUseCase";
import { GetUserByEmailUseCase } from "../application/usecases/user/GetUserByEmailUseCase ";
import { SearchUsersUseCase } from "../application/usecases/user/SearchUsersUseCase";
import { UserController } from "../presentation/controllers/UserController";
import { CommentRepository } from "../infrastructure/database/repositories/CommentRepository";
import TYPES from "../types";


const container = new Container();

container.bind<CommentRepository>(TYPES.CommentRepository).to(CommentRepository).inSingletonScope();
container.bind<UserRepository>(TYPES.UserRepository).to(UserRepository);

container.bind<GetAllUsersUseCase>(TYPES.GetAllUsersUseCase).to(GetAllUsersUseCase);
container.bind<BlockUserUseCase>(TYPES.BlockUserUseCase).to(BlockUserUseCase);
container.bind<UpdateUserUseCase>(TYPES.UpdateUserUseCase).to(UpdateUserUseCase);
container.bind<GetUserByEmailUseCase>(TYPES.GetUserByEmailUseCase).to(GetUserByEmailUseCase);
container.bind<SearchUsersUseCase>(TYPES.SearchUsersUseCase).to(SearchUsersUseCase);


export default container;
