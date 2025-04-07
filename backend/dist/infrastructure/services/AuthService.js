"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOTP = exports.generateOTP = exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || 'Nothing';
class AuthService {
    async hashPassword(password) {
        return await bcrypt_1.default.hash(password, 10);
    }
    async comparePasswords(password, hashed) {
        return bcrypt_1.default.compare(password, hashed);
    }
    generateToken(user) {
        return jsonwebtoken_1.default.sign({
            id: user.id, email: user.email, role: user.role
        }, JWT_SECRET, { expiresIn: '1h' });
    }
    verifyToken(token) {
        return jsonwebtoken_1.default.verify(token, JWT_SECRET);
    }
}
exports.AuthService = AuthService;
const otpStore = new Map();
const generateOTP = (email) => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = Date.now() + 5 * 60 * 1000;
    otpStore.set(email, { otp, expires });
    return otp;
};
exports.generateOTP = generateOTP;
const verifyOTP = (email, otp) => {
    const record = otpStore.get(email);
    if (!record)
        return false;
    if (Date.now() > record.expires) {
        otpStore.delete(email);
        return false;
    }
    if (record.otp === otp) {
        otpStore.delete(email);
        return true;
    }
    return false;
};
exports.verifyOTP = verifyOTP;
//# sourceMappingURL=AuthService.js.map