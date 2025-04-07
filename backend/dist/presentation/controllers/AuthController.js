"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const UserRepository_1 = require("../../infrastructure/database/repositories/UserRepository");
const AuthService_1 = require("../../infrastructure/services/AuthService");
const RegisterUserUsecase_1 = require("../../application/usecases/auth/RegisterUserUsecase");
const LoginUserUseCase_1 = require("../../application/usecases/auth/LoginUserUseCase");
const ResetPasswordUseCase_1 = require("../../application/usecases/auth/ResetPasswordUseCase");
const ForgotPasswordUseCase_1 = require("../../application/usecases/auth/ForgotPasswordUseCase");
const OTPVerificationUseCase_1 = require("../../application/usecases/auth/OTPVerificationUseCase");
// Removed unused imports from "jsonwebtoken"
const userRepository = new UserRepository_1.UserRepository();
const authService = new AuthService_1.AuthService();
const registerUseCase = new RegisterUserUsecase_1.RegisterUseCase(userRepository, authService);
const loginUseCase = new LoginUserUseCase_1.LoginUseCase(userRepository, authService);
const resetPasswordUseCase = new ResetPasswordUseCase_1.ResetPasswordUseCase(userRepository, authService);
const forgotPasswordUseCase = new ForgotPasswordUseCase_1.ForgotPasswordUseCase(userRepository);
// If OTPVerificationUseCase does not require any parameters, instantiate it without any:
const otpVerificationUseCase = new OTPVerificationUseCase_1.OTPVerificationUseCase();
exports.AuthController = {
    signUp: async (req, res, next) => {
        try {
            const { name, email, password } = req.body;
            const user = await registerUseCase.execute(name, email, password);
            res.status(201).json({ message: 'User registered successfully', user });
        }
        catch (error) {
            next(error);
        }
    },
    login: async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const token = await loginUseCase.execute(email, password);
            if (!token)
                return res.status(401).json({ message: 'Invalid credentials' });
            res.status(200).json({ message: 'User logged in successfully', token });
        }
        catch (error) {
            next(error);
        }
    },
    forgotPassword: async (req, res, next) => {
        try {
            const { email } = req.body;
            const otp = await forgotPasswordUseCase.execute(email);
            if (!otp)
                return res.status(404).json({ message: 'User not found' });
            res.status(200).json({ message: 'OTP sent successfully' }); // Do not send OTP in production!
        }
        catch (error) {
            next(error);
        }
    },
    verifyOTP: async (req, res, next) => {
        try {
            const { email, otp } = req.body;
            const valid = await otpVerificationUseCase.execute(email, otp);
            if (!valid)
                return res.status(400).json({ message: 'Invalid or expired OTP' });
            res.status(200).json({ message: 'OTP verified successfully' });
        }
        catch (error) {
            next(error);
        }
    },
    resetPassword: async (req, res, next) => {
        try {
            const { email, newPassword } = req.body;
            const success = await resetPasswordUseCase.execute(email, newPassword);
            if (!success)
                return res.status(404).json({ message: 'Reset password failed' });
            res.status(200).json({ message: 'Password reset successfully' });
        }
        catch (error) {
            next(error);
        }
    }
};
//# sourceMappingURL=AuthController.js.map