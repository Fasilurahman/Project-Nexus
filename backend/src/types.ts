const TYPES = {
    UserRepository: Symbol.for("UserRepository"),
    GetAllUsersUseCase: Symbol.for("GetAllUsersUseCase"),
    BlockUserUseCase: Symbol.for("BlockUserUseCase"),
    UpdateUserUseCase: Symbol.for("UpdateUserUseCase"),
    GetUserByEmailUseCase: Symbol.for("GetUserByEmailUseCase"),
    SearchUsersUseCase: Symbol.for("SearchUsersUseCase"),
    UserController: Symbol.for("UserController"),
    CommentRepository: Symbol.for('CommentRepository'),
  };
  
  export default TYPES;
  