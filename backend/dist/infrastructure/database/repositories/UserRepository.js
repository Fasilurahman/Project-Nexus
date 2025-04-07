"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const User_1 = require("../../../domain/entities/User");
const userModel_1 = require("../models/userModel");
class UserRepository {
    async findByEmail(email) {
        const userDoc = await userModel_1.UserModel.findOne({ email });
        if (!userDoc)
            return null;
        return new User_1.User(userDoc._id.toString(), userDoc.name, userDoc.email, userDoc.role, userDoc.password, userDoc.profilePic, userDoc.teamId ? userDoc.teamId.toString() : undefined, userDoc.projects ? userDoc.projects.map((p) => p.toString()) : []);
    }
    async findById(id) {
        const userDoc = await userModel_1.UserModel.findById(id);
        if (!userDoc)
            return null;
        return new User_1.User(userDoc._id.toString(), userDoc.name, userDoc.email, userDoc.role, userDoc.password, userDoc.profilePic, userDoc.teamId ? userDoc.teamId.toString() : undefined, userDoc.projects ? userDoc.projects.map((p) => p.toString()) : []);
    }
    async save(user) {
        const newUser = await userModel_1.UserModel.create({
            name: user.name,
            email: user.email,
            role: user.role,
            password: user.password
        });
        return new User_1.User(newUser._id.toString(), newUser.name, newUser.email, newUser.role, newUser.password, newUser.profilePic, newUser.teamId ? newUser.teamId.toString() : undefined, newUser.projects ? newUser.projects.map((p) => p.toString()) : []);
    }
    async updatePassword(id, newPassword) {
        await userModel_1.UserModel.findByIdAndUpdate(id, { password: newPassword });
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=UserRepository.js.map