import { ManagedUpload } from "aws-sdk/lib/s3/managed_upload";
import SendData = ManagedUpload.SendData;
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

import { s3 } from "../../common/config/aws-config";

const s3Client = new S3Client();

const getSignedUrlForImage = async (
  command: GetObjectCommand,
  options: { expiresIn: number },
): Promise<string> => {
  return await getSignedUrl(s3Client, command, {
    expiresIn: options.expiresIn,
  });
};

const upload = async (params: {
  bucket: string;
  key: string;
  body: Buffer;
  contentType: string;
}): Promise<SendData> => {
  return s3
    .upload({
      Bucket: params.bucket,
      Key: params.key,
      Body: params.body,
      ContentType: params.contentType,
    })
    .promise();
};

const deleteObject = async (params: { bucket: string; key: string }) => {
  return s3
    .deleteObject({
      Bucket: params.bucket,
      Key: params.key,
    })
    .promise();
};

export { upload, deleteObject, getSignedUrlForImage };
