import express from "express";
import dotenv from "dotenv";
import "reflect-metadata";
import { connectDB } from "./config/db";
import authRoutes from "./presentation/routes/authRoutes";
import userRoutes from "./presentation/routes/UserRouter";
import commentRoutes from "./presentation/routes/commentRoutes";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import projectRoutes from "./presentation/routes/projectRoutes";
import teamRoutes from "./presentation/routes/teamRoutes";
import taskRoutes from "./presentation/routes/taskRoute";
import notificationRoutes from "./presentation/routes/notificationRoute";
import chatRoutes from "./presentation/routes/chatRoutes";
import subscriptionRoutes from "./presentation/routes/subscriptionRoutes";
import logger from "./infrastructure/logging/logger";
import { errorHandler } from "./middleware/errorHandler";
import routers from "./presentation/routes/routers";
dotenv.config();
connectDB();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);

app.use(morgan("dev"));
app.use(morgan('combined',{
  stream: {
    write: (message)=> logger.info(message.trim()),
  }
}))

app.use('/',routers)

// app.use("/api/subscriptions/stripe-webhook", subscriptionRoutes);

// app.use(express.json());

// app.use("/api/subscriptions", subscriptionRoutes);
// app.use("/api/auth", authRoutes);
// app.use("/api", userRoutes);
// app.use("/api/project", projectRoutes);
// app.use("/api/team", teamRoutes);
// app.use('/api/task',taskRoutes);
// app.use('/api/notifications',notificationRoutes)
// app.use('/api/chats', chatRoutes);

// app.use('/api/comment', commentRoutes);

app.use(errorHandler)

export default app;
