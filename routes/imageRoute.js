import express from 'express';
import * as imageController from '../controllers/imageController.js';
import * as authController from '../controllers/authController.js';
const imageRouter = express.Router();

imageRouter.post(
  '/signed-url',
  authController.auth,
  imageController.getS3SignedUrl
);

imageRouter.post('/upload', authController.auth, imageController.upload);

imageRouter.get('/', authController.auth, imageController.getImage);

export { imageRouter };
