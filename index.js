import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import 'dotenv/config';

import { imageRouter } from './routes/imageRoute.js';
import { authRouter } from './routes/authRoute.js';
import { errorHandler } from './utils/errorHandler.js';

const app = express();

try {
  await mongoose.connect(process.env.MONGO_CONNECTION_URI).then(
    () => {
      console.log(`DB connected successfully!`);
    },
    (err) => {
      throw err;
    }
  );

  app.use(morgan('tiny'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use('/api/images', imageRouter);
  app.use('/api/auth', authRouter);

  app.use(errorHandler);

  app.listen(3000, () => {
    console.log('Listening on port 3000...');
  });
} catch (err) {
  console.log(err);
}
