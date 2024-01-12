import { Router } from "express";
import authentication from "./auth";
import tweets from "./tweet";

const router = Router();

export default (): Router => {
  authentication(router);
  tweets(router)
  return router;
};
