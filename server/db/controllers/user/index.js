import { ValidationError } from 'apollo-server';
import mongoose from 'mongoose';

const ObjectId = mongoose.Types.ObjectId;

const getUser = async (args, models) => {
  const User = models.User;
  const { id, ...otherArgs } = args;

  if (Object.keys(args).length === 0) {
    throw new ValidationError(`Please enter at least one parameter`);
  }

  if (!id) {
    throw new ValidationError(`Please enter id`);
  } else if (!ObjectId.isValid(id)) {
    throw new ValidationError(`id: ${id} not valid`);
  }

  const user = await User.findOne({ _id: id, ...otherArgs });

  if (!user) {
    throw new ValidationError('User not found');
  }

  return user;
};

const updateUser = async (args, models) => {
  const User = models.User;
  const { id, input } = args;

  if (!id) {
    throw new ValidationError(`Please enter id`);
  } else if (!ObjectId.isValid(id)) {
    throw new ValidationError(`id: ${id} not valid`);
  }

  const user = await User.findByIdAndUpdate(id, { $set: input });

  if (!user) {
    throw new ValidationError('User not found');
  }

  return user;
};

export default {
  getUser,
  updateUser
};
