"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
// src/domain/entities/User.ts
class User {
    constructor(id, name, email, role, password, profilePic, teamId, projects, createdAt, updatedAt) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.password = password;
        this.profilePic = profilePic;
        this.teamId = teamId;
        this.projects = projects;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
exports.User = User;
//# sourceMappingURL=User.js.map