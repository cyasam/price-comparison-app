import userController from '../../db/controllers/user/';
import utils from '../../utils';

const resolvers = {
  Query: {
    user: utils.authenticated((_, args, { models }) => {
      return userController.getUser(args, models);
    })
  },
  Mutation: {
    updateUser: utils.authenticated((_, args, { models }) => {
      return userController.updateUser(args, models);
    })
  }
};

export default resolvers;
