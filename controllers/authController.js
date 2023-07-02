import { Account } from '../models/accountModel.js';

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const account = await Account.findOne({
      username
    });

    const isPasswordMatched = account.isPasswordMatched(
      password,
      account.password
    );

    if (account && isPasswordMatched) {
      res.status(200).json({
        status: 'success',
        message: 'Login successfully',
        data: {
          account: {
            username: account.username,
            avatar: account.avatar
          }
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
    const account = new Account({
      username,
      password
    });

    await account.save();

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
      username
    });

    if (!account) {
      res.status(400).json({
        status: 'fail',
        message: 'Please login'
      });
    }

    const isPasswordMatched = await account.isPasswordMatched(
      password,
      account.password
    );

    if (!isPasswordMatched) {
      res.status(400).json({
        status: 'fail',
        message: 'Please login'
      });
    }

    res.locals.username = account.username;
    next();
  } catch (err) {
    next(err);
  }
};

export { login, register, auth };
