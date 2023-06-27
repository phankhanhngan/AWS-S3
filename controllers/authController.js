import { Account } from '../models/accountModel.js';

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const account = await Account.findOne({
      username,
      password
    });

    if (account) {
      res.status(200).json({
        status: 'success',
        message: 'Login successfully',
        data: {
          account
        }
      });
    } else {
      res.status(400).json({
        status: 'fail',
        message: 'Wrong username or password'
      });
    }
  } catch (err) {
    next(err);
  }
};

const register = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const account = await Account.create({
      username,
      password
    });

    res.status(200).json({
      status: 'success',
      message: 'Registered successfully',
      data: {
        account
      }
    });
  } catch (err) {
    next(err);
  }
};

const auth = async (req, res, next) => {
  try {
    const authInfo = new Buffer.from(
      req.headers.authorization.split(' ')[1],
      'base64'
    ).toString();

    const username = authInfo.split(':')[0];
    const password = authInfo.split(':')[1];
    const account = await Account.findOne({
      username,
      password
    });

    if (account) {
      res.locals.username = account.username;
      next();
    } else {
      res.status(400).json({
        status: 'fail',
        message: 'Please login'
      });
    }
  } catch (err) {
    next(err);
  }
};

export { login, register, auth };
