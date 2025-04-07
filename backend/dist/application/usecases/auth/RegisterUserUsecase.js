"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterUseCase = void 0;
const User_1 = require("../../../domain/entities/User");
class RegisterUseCase {
    constructor(userRepository, authService) {
        this.userRepository = userRepository;
        this.authService = authService;
    }
    async execute(name, email, password) {
        const hashedPassword = await this.authService.hashPassword(password);
        const user = new User_1.User("", name, email, "employee", hashedPassword);
        return this.userRepository.save(user);
    }
}
exports.RegisterUseCase = RegisterUseCase;
//# sourceMappingURL=RegisterUserUsecase.js.map