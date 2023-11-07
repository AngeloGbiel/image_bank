import { S3Client } from "@aws-sdk/client-s3";
const accessKeyId = process.env.ACCESS_KEY
const secretAccessKey = process.env.SECRET_KEY
const region = process.env.REGION_AWS

const S3Config = new S3Client({
  region: `${region}`,
  credentials: {
    accessKeyId: `${accessKeyId}`,
    secretAccessKey: `${secretAccessKey}`,
  },
});

export default S3Config