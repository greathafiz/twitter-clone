import "dotenv/config";
import connectDB from "./config/db";
import chalk from "chalk";
import express, { Application } from "express";
import router from "./routes";
import { port, mongoUri } from "./config";

const app: Application = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Twitter clone API</h1>");
});

app.use("/api", router());

const start = async (): Promise<void> => {
  try {
    if (mongoUri) {
      await connectDB(mongoUri);
      app.listen(port, () => {
        console.log(
          `Server is running at http://localhost:${chalk.green(port)}`
        );
      });
    }
  } catch (error) {
    console.error(`connection to the database failed`, error);
  }
};

start();
