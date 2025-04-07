"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OTPVerificationUseCase = void 0;
const AuthService_1 = require("../../../infrastructure/services/AuthService");
class OTPVerificationUseCase {
    async execute(email, otp) {
        return (0, AuthService_1.verifyOTP)(email, otp);
    }
}
exports.OTPVerificationUseCase = OTPVerificationUseCase;
//# sourceMappingURL=OTPVerificationUseCase.js.map