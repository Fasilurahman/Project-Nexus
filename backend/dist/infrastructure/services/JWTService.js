"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class JWTService {
    constructor() {
        this.secretKey = process.env.JWT_SECRET || 'Nothing';
    }
    generateToken(userId, role) {
        return jsonwebtoken_1.default.sign({ userId, role }, this.secretKey, { expiresIn: '1h' });
    }
    verifyToken(token) {
        return jsonwebtoken_1.default.verify(token, this.secretKey);
    }
}
exports.JWTService = JWTService;
//# sourceMappingURL=JWTService.js.map