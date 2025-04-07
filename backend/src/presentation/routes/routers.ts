import express , { Router } from "express";
import subscriptionRoutes from './subscriptionRoutes'
import authRoutes from "./authRoutes";
import userRoutes from "./UserRouter";
import commentRoutes from "./commentRoutes";
import projectRoutes from "./projectRoutes";
import teamRoutes from "./teamRoutes";
import taskRoutes from "./taskRoute";
import notificationRoutes from "./notificationRoute";
import chatRoutes from './chatRoutes'
import { StripeWebhookController } from "../controllers/webhookController";
import { authMiddleware } from "../../middleware/authMiddleware";

const routers = Router()
const stripeWebhook = new StripeWebhookController()
routers.post("/api/subscriptions/stripe-webhook", express.raw({ type: "application/json" }), stripeWebhook.handleWebhook.bind(stripeWebhook));

routers.use(express.json());

routers.use("/api/subscriptions", subscriptionRoutes);
routers.use("/api/auth", authRoutes);
routers.use("/api", userRoutes);
routers.use("/api/project", projectRoutes);
routers.use("/api/team", teamRoutes);
routers.use('/api/task',taskRoutes);
routers.use('/api/notifications',notificationRoutes)
routers.use('/api/chats', chatRoutes);

routers.use('/api/comment', commentRoutes);


export default routers