import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { jwtLifetime, jwtSecret } from "../config";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!password) {
      return res.sendStatus(400);
    }

    await User.create({ email, password });

    res.json({
      status: "success",
      msg: "Your account has been successfully created",
    });
    // res.redirect("/api/auth/login");
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.sendStatus(400);
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
      res.json({
        status: "success",
        msg: "Successfully logged in",
        user,
        token: token,
      });
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
