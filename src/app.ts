import "dotenv/config";
import express, { Express } from "express";
require("express-async-errors");

import routes from "./routers";
import { errorHandler } from "./middlewares/error-handler";
import { RouterNotFoundError } from "./common/errors/router-not-found-error";

const app: Express = express();
app.use(express.json());
routes(app);

app.all("*", (req, res) => {
  throw new RouterNotFoundError();
});

app.use(errorHandler);

export { app };
