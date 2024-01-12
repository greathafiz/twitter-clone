import { Router, Request, Response } from "express";
import { createTweet, deleteTweet, getASingleTweet, getTweets } from "../controllers/tweet";
import { auth } from "../middlewares/verify-token";

export default (router: Router) => {
    router.get("/tweets", auth, getTweets)
    router.post("/tweets", auth, createTweet)
    router.get("/tweets/:id", auth, getASingleTweet)
    // router.put("/tweets/:id", auth, getTweets)
    router.delete("/tweets/:id", auth, deleteTweet)
}