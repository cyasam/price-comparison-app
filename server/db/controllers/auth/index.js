import bcrypt from 'bcrypt';

const generatePassword = async password => {
  try {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  } catch (err) {
    throw new Error(err.message);
  }
};

const createToken = () => {
  return 'sdfgsdgdf';
};

const signIn = async (args, models) => {
  const User = models.User;
  return await User.findOne({ args });
};

const signUp = async (args, models) => {
  const User = models.User;
  const { email, password, name } = args.input;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error('User exists');
  }

  const hashPassword = await generatePassword(password);

  const newUser = new User({
    email,
    password: hashPassword,
    name,
    createDate: new Date().toISOString()
  });

  const createdUser = await newUser.save();
  const token = createToken();

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
  signIn,
  signUp
};
