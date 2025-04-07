"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthController_1 = require("../controllers/AuthController");
const router = (0, express_1.Router)();
router.post('/sign-up', AuthController_1.AuthController.signUp);
router.post('/login', AuthController_1.AuthController.login);
router.post('/forgot-password', AuthController_1.AuthController.forgotPassword);
router.post('/verify-otp', AuthController_1.AuthController.verifyOTP);
router.post('/reset-password', AuthController_1.AuthController.resetPassword);
exports.default = router;
//# sourceMappingURL=authRoutes.js.map