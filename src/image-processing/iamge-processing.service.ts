import { Request, Response } from "express";

import { BadRequestError } from "../common/errors/bad-request-error";
import { ErrorMessage } from "../common/constant";
import { removeObjectFromPhoto } from "../external-api/photo-ai-api/photo-ai-api.service";
import { MulterFileInterfaces } from "../common/interfaces";
import { deleteObject, getSignedUrlForImage, upload } from "../aws/s3-service";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { InternalServerError } from "../common/errors/internal-server-error";

export const removeObjectFromImage = async (req: Request, res: Response) => {
  const files = req.files as MulterFileInterfaces;
  const sourceFile = files?.source?.[0];
  const maskFile = files?.mask?.[0];

  if (!sourceFile || !maskFile) {
    throw new BadRequestError(ErrorMessage.SOURCE_AND_MASK_IS_REQUIRED);
  }

  const sourceKey: string = `source/${Date.now().toString()}-${sourceFile.originalname}`;
  await upload({
    bucket: process.env.AWS_S3_BUCKET_NAME!,
    key: sourceKey,
    body: sourceFile.buffer,
    contentType: sourceFile.mimetype,
  });

  const sourcePath: string = await getSignedUrlForImage(
    new GetObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
      Key: sourceKey,
    }),
    { expiresIn: 60 * 60 },
  );

  const maskFileBase64: string = maskFile.buffer.toString("base64");
  const fileName: string = sourceFile.originalname;

  const response = await removeObjectFromPhoto(
    sourcePath,
    maskFileBase64,
    fileName,
  );

  if (response.success) {
    // remove source image from s3 without waiting for response
    deleteObject({
      bucket: process.env.AWS_S3_BUCKET_NAME!,
      key: sourceKey,
    });

    return res.json(response.result);
  }

  if (response.error?.message) {
    throw new BadRequestError(response.error.message);
  }

  throw new InternalServerError(ErrorMessage.INTERNAL_SERVER_ERROR);
};
