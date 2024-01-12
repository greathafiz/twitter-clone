import "dotenv/config";
import connectDB from "./config/db";
import chalk from "chalk";
import express, { Application } from "express";
import router from "./routes";
import { port, mongoUri, sessionSecret } from "./config";
import passport from "passport";
import configurePassport from "./config/passport"
import session from "express-session";
import cors from "cors"
import helmet from "helmet";
import { errorHandlerMiddleware } from "./middlewares/error-handler";
import { notFoundMiddleware } from "./middlewares/not-found";

configurePassport(passport)

const app: Application = express();

app.use(cors())
app.use(helmet())

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    // store: MongoStore.create({ mongoUrl: mongoUri }),
  })
);

app.use(passport.initialize())
app.use(passport.session())

app.get("/", (req, res) => {
  res.send("<h1>Twitter clone API</h1>");
});

app.use("/api", router());
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

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
