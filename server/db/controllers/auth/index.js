import { ForbiddenError, AuthenticationError } from 'apollo-server';
import utils from '../../../utils';

const getUserById = async (args, models) => {
  const User = models.User;
  return await User.findById(args.id);
};

const signIn = async (args, models) => {
  const User = models.User;

  const { email, password } = args.input;
  const existingUser = await User.findOne({ email });

  const errorMessage = 'Wrong email and password';

  if (!existingUser) {
    throw new AuthenticationError(errorMessage);
  }

  const isPasswordSame = await utils.comparePassword(
    password,
    existingUser.password
  );

  if (!isPasswordSame) {
    throw new AuthenticationError(errorMessage);
  }

  const token = utils.createToken(existingUser);

  return {
    token,
    user: {
      id: existingUser._id,
      email: existingUser.email,
      name: existingUser.name
    }
  };
};

const signUp = async (args, models) => {
  const User = models.User;
  const { email, password, name } = args.input;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ForbiddenError('User exists');
  }

  const hashPassword = await utils.encryptPassword(password);

  const newUser = new User({
    email,
    password: hashPassword,
    name,
    createDate: new Date().toISOString()
  });

  const createdUser = await newUser.save();
  const token = utils.createToken(createdUser);

  return {
    token,
    user: {
      id: createdUser._id,
      email: createdUser.email,
      name: createdUser.name
    }
  };
};

export default {
  getUserById,
  signIn,
  signUp
};
