import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { AuthenticationError } from 'apollo-server';

import authController from '../db/controllers/auth/';

const authenticated = next => async (_, args, context) => {
  const { user } = context;
  if (!user) {
    throw new AuthenticationError('You must be logged in');
  }

  const { models } = context;
  const existingUser = await authController.getUserById(
    { id: user.sub },
    models
  );

  if (!existingUser) {
    throw new AuthenticationError('You must be logged in');
  }

  return next(_, args, context);
};

const encryptPassword = async password => {
  try {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  } catch (err) {
    throw new Error('Internal Error');
  }
};

const comparePassword = async (password, realPassword) => {
  try {
    return await bcrypt.compare(password, realPassword);
  } catch (err) {
    throw new Error('Internal Error');
  }
};

const createToken = user => {
  try {
    return jwt.sign(
      {
        sub: user.id,
        name: user.name,
        email: user.email
      },
      process.env.SECRET_KEY,
      { expiresIn: process.env.EXPIRES_IN }
    );
  } catch (err) {
    throw new Error('Internal Error');
  }
};

const getUser = token => {
  try {
    return token ? jwt.verify(token, process.env.SECRET_KEY) : null;
  } catch (err) {
    return null;
  }
};

export default {
  authenticated,
  encryptPassword,
  comparePassword,
  createToken,
  getUser
};