"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgotPasswordUseCase = void 0;
const AuthService_1 = require("../../../infrastructure/services/AuthService");
class ForgotPasswordUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(email) {
        const user = await this.userRepository.findByEmail(email);
        if (!user)
            return null;
        const otp = (0, AuthService_1.generateOTP)(email);
        console.log(`OTP for ${email}: ${otp}`);
        return otp;
    }
}
exports.ForgotPasswordUseCase = ForgotPasswordUseCase;
//# sourceMappingURL=ForgotPasswordUseCase.js.map