import { ValidationError } from 'apollo-server';
import mongoose from 'mongoose';

const ObjectId = mongoose.Types.ObjectId;

const getUsers = async (args, models) => {
  const User = models.User;

  const user = await User.find(args);

  return user;
};

const getUser = async (args, models) => {
  const User = models.User;
  const { id, ...otherArgs } = args;

  if (Object.keys(args).length === 0) {
    throw new ValidationError(`Please enter at least one parameter`);
  }

  if (!id && Object.keys(otherArgs).length === 0) {
    throw new ValidationError(`Please enter id`);
  } else if (id && !ObjectId.isValid(id)) {
    throw new ValidationError(`id: ${id} not valid`);
  }

  const params = { ...otherArgs };

  if (id) {
    params._id = id;
  }

  const user = await User.findOne(params);

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
  getUsers,
  getUser,
  updateUser
};
