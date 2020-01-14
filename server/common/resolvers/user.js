import userController from '../../db/controllers/user/';
import utils from '../../utils';

const resolvers = {
  Query: {
    user: utils.authenticated((_, args, { models }) => {
      return userController.getUser(args, models);
    })
  }
};

export default resolvers;
