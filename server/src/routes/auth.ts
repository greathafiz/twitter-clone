import { Router, Request, Response } from "express";
import passport from "passport";
import { register, login } from "../controllers/auth";

export default (router: Router) => {
  router.post("/auth/register", register);
  router.post("/auth/login", login);
  router.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["email", "profile"],
    })
  );
  router.get(
    "/auth/google/redirect",
    passport.authenticate("google", { failureRedirect: "/" }),
    (req: Request, res: Response) => {
      // res.redirect("/home");
      res.send("Callback route");
    }
  );
};
