import { CreateBucketCommand } from "@aws-sdk/client-s3";
import { s3Client } from './s3Client.js';

const input = {
    Bucket: 'ngan-tested-bucket',
}

const command = new CreateBucketCommand(input);
const response = await s3Client.send(command);
console.log(response);