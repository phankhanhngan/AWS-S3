import { s3Client } from './libs/s3Client.js';
import fs from 'fs';
import axios from 'axios';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

try {
  const fileName = 'nhung.jpg';
  const fileType = 'image/jpg';

  const key = `nhungphan/${fileName}`;

  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET,
    Key: key,
    ContentType: fileType
  });

  const signedUrl = await getSignedUrl(s3Client, command, {
    expiresIn: 3600
  });

  fs.readFile('nhung.jpg', async (err, data) => {
    // console.log(data);
    const result = await axios.put(signedUrl, data, {
      headers: {
        'Content-Type': fileType
      }
    });
    // console.log(result);
  });
} catch (err) {
  console.log(err);
}
