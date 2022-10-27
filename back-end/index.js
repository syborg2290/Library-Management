import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import expressSanitizer from "express-sanitizer";
import mongoSanitize from "express-mongo-sanitize";
import dbConnection from "./database/connection.js";
import ErrorHandler from "./utils/error-handler.js";
import { authorController, bookController } from "./controller/index.js";

// config .env
dotenv.config();

// Initialize express
const app = express();

// sets port 5001 to default or otherwise specified in the environment variables and initialize
const PORT = process.env.PORT || 5001;

const startServer = () => {
  try {
    dbConnection();

    // attach express-sanitizer middleware here
    app.use(expressSanitizer());

    // The sanitize function will strip out any keys that start with '$' in the input,
    // so you can pass it to MongoDB without worrying about malicious users overwriting
    // query selectors.
    app.use(mongoSanitize());

    // secure apps by setting various HTTP headers and hiding unwanted headers to display with a request
    app.use(helmet());

    // Set the body size
    app.use(express.json({ limit: "1mb" }));

    // attach cookieParser middleware here
    app.use(cookieParser());

    // attach error handling middleware
    app.use(ErrorHandler);

    // parse application/json, basically parse incoming Request Object as a JSON Object
    app.use(
      bodyParser.urlencoded({
        extended: true,
        limit: "1mb",
      })
    );

    // enable CORS - Cross Origin Resource Sharing
    app.use(
      cors({
        origin: "http://localhost:3000",
        credentials: true,
      })
    );

    //api
    authorController(app);
    bookController(app);

    app
      .listen(PORT, () => {
        console.log(`LMS app listening on port ${PORT}`);
      })
      .on("error", (err) => {
        console.log(err);
        process.exit();
      });
  } catch (error) {
    throw new Error(error);
  }
};

startServer();
