import Tweet from "../models/Tweet";
import { Request, Response } from "express";

export const createTweet = async (req: Request, res: Response) => {
  try {
    res.send("Create tweet");
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const getTweets = async (req: Request, res: Response) => {
  try {
    // res.send('HI')
    const tweets = await Tweet.find({});
    if (!tweets) {
      return res.status(400).json({ msg: "No tweets." });
    }

    res.status(200).json({ msg: tweets });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Something went wrong. Please try again." });
  }
};

export const getASingleTweet = async (req: Request, res: Response) => {
  try {
    res.send("Get a single tweet");
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const deleteTweet = async (req: Request, res: Response) => {
  try {
    res.send("Delete tweet");
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
