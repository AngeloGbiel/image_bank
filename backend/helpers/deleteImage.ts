import fs from "fs";
import {
  DeleteObjectCommand,
  S3Client,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import path from "path";
import S3Config from "./S3Config";

const bucketProfileUser = process.env.BUCKET_PROFILE_USER;
const bucketImagesUpload = process.env.BUCKET_IMAGES_UPLOAD;

export const deleteImage = (image: string) => {
  S3Config.send(
    new DeleteObjectCommand({ Bucket: `${bucketImagesUpload}`, Key: image })
  );
};
export const deleteImageProfileAfterEdit = (image: string) => {
  S3Config.send(
    new DeleteObjectCommand({ Bucket: `${bucketProfileUser}`, Key: image })
  );
};
