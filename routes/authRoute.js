import express from 'express';
import * as authController from '../controllers/authController.js';

const authRouter = express.Router();

authRouter.post('/login', authController.login);

authRouter.post('/register', authController.register);

export { authRouter };
