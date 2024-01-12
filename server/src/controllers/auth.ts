import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { jwtLifetime, jwtSecret } from "../config";
import { BadRequestError } from "../errors";

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    if (!password || !email) {
      throw new BadRequestError("Provide both email and password.")
    }

      const user = await User.create(req.body);

      return res.status(201).json({
        msg: "Your account has been successfully created.",
        user
      });

    // res.redirect("/api/auth/login");
  } catch (error) {
    next(error)
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new BadRequestError("Provide both email and password.")
    }

    const user = await User.findOne({ email });

    if (user) {
      const isPassword = bcrypt.compareSync(password, user.password);

      if (!isPassword) {
        return res.json("Password is incorrect");
      }

      const token = jwt.sign({ userId: user._id }, jwtSecret, {
        expiresIn: jwtLifetime,
      });

      return res.json({
        msg: "Successfully logged in",
        user,
        token,
      });
    } else {
      throw new BadRequestError('Invalid credentials.')
    }
  } catch (error) {
    next(error)
  }
};
