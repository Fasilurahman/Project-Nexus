"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true, enum: ["admin", "team-lead", "employee"], default: "employee" },
    password: { type: String, required: true },
    profilePic: { type: String, default: "" },
    teamId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Team" },
    projects: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Project" }],
}, { timestamps: true });
exports.UserModel = mongoose_1.default.model('User', UserSchema);
//# sourceMappingURL=userModel.js.map