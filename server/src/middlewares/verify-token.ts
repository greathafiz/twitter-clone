import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express";
import { jwtSecret } from "../config";
import { UserDoc } from "../interfaces/UserDoc";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization

    if (
        !authHeader ||
        !authHeader.startsWith("Bearer")
      ) {
        return res.status(401).json({msg: "JWT not found"})
      }

      const token = authHeader?.split(" ")[1]

      try {
        const payload = jwt.verify(token, jwtSecret) as { userId: string };
        req.user = { userId: payload.userId } as UserDoc;
        // console.log(req.user);
        next();
      } catch (error) {
        console.error(error);
        res.status(401).json({msg: "Authentication failed."})
      }
}