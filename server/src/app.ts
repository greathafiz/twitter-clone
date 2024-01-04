import "dotenv/config";
import connectDB from "./config/db";
import chalk from "chalk";
import express, { Application } from "express";
import router from "./routes";

const app: Application = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Twitter clone API</h1>");
});

app.use('/api', router())


const port: string | number = process.env.PORT || 5001;

const start = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGO_URI;

    if (mongoURI) {
      await connectDB(mongoURI);
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
