import { Express } from "express";

import imageProcessingController from "./image-processing/image-processing.controller";
import { RouterNotFoundError } from "./common/errors/router-not-found-error";

const handleRouters = (app: Express) => {
  app.use("/api/image-processing", imageProcessingController);

  app.all("/api/*", () => {
    throw new RouterNotFoundError();
  });
};

export default handleRouters;
