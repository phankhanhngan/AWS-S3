import { S3Client } from '@aws-sdk/client-s3';
import * as dotenv from 'dotenv'; 
dotenv.config();

const clientParams = {
  region: process.env.S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
};

const s3Client = new S3Client(clientParams);

export { s3Client };
