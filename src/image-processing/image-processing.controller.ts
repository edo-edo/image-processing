import express from "express";
import multer from "multer";

import { removeObjectFromImage } from "./iamge-processing.service";

const router = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    files: 2,
  },
});

router.post(
  "/remove-object",
  upload.fields([{ name: "source" }, { name: "mask" }]),
  removeObjectFromImage,
);

export default router;
