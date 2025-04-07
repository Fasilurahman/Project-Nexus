"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetPasswordUseCase = void 0;
class ResetPasswordUseCase {
    constructor(useRepository, authService) {
        this.useRepository = useRepository;
        this.authService = authService;
    }
    async execute(email, newPassword) {
        const user = await this.useRepository.findByEmail(email);
        if (!user)
            return false;
        const hashed = await this.authService.hashPassword(newPassword);
        await this.useRepository.updatePassword(user.id, hashed);
        return true;
    }
}
exports.ResetPasswordUseCase = ResetPasswordUseCase;
//# sourceMappingURL=ResetPasswordUseCase.js.map