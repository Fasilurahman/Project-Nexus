"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUseCase = void 0;
class LoginUseCase {
    constructor(userRepository, authService) {
        this.userRepository = userRepository;
        this.authService = authService;
    }
    async execute(email, password) {
        const user = await this.userRepository.findByEmail(email);
        if (!user)
            return null;
        const valid = await this.authService.comparePasswords(password, user.password);
        if (!valid)
            return null;
        return this.authService.generateToken(user);
    }
}
exports.LoginUseCase = LoginUseCase;
//# sourceMappingURL=LoginUserUseCase.js.map