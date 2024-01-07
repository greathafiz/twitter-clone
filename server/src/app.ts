import "dotenv/config";
import connectDB from "./config/db";
import chalk from "chalk";
import express, { Application } from "express";
import router from "./routes";
import { port, mongoUri, sessionSecret } from "./config";
import passport from "passport";
import configurePassport from "./config/passport"
import session from "express-session";

configurePassport(passport)

const app: Application = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    // store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  })
);

app.use(passport.initialize())
app.use(passport.session())

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
