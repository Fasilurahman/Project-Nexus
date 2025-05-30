import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../domain/entities/User";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log(token,'token');
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
  
    req.user = decoded;
    console.log(req.user,'req.user');

    next(); 
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
