import { s3Client } from '../libs/s3Client.js';

import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import { Account } from '../models/accountModel.js';

const getS3SignedUrl = async (req, res, next) => {
  try {
    const { fileType } = req.query;
    const time = Date.now()
    const expand = fileType.split('/')[1];
    const key = `${res.locals.username}/${time}.${expand}`;
     
    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET,
      Key: key,
      ContentType: fileType,
    });

    const signedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 3600,
    });

    res.status(200).json({
      status: 'success',
      message: 'Get signed url successfully',
      data: {
        signedUrl,
        key
      },
    });
  } catch (err) {
    return next(err);
  }
};

const upload = async (req, res, next) => {
  try {
    const { path } = req.body;
    const username = res.locals.username;

    await Account.updateOne(
      { username },
      {
        avatar: path,
      },
    );

    res.status(200).json({
      status: 'success',
      message: 'Save path successfully',
    });
  } catch (err) {
    next(err);
  }
};

const getImage = async (req, res, next) => {
  try {
    const username = res.locals.username;

    const path = (await Account.findOne({ username })).avatar;

    res.status(200).json({
      status: 'success',
      message: 'Get path successfully',
      data: {
        path,
      },
    });
  } catch (err) {
    next(err);
  }
};
export { getS3SignedUrl, upload, getImage };
