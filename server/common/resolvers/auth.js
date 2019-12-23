import authController from '../../db/controllers/auth/';

const resolvers = {
  Mutation: {
    signIn(_, args, { models }) {
      return authController.signIn(args, models);
    },
    signUp(_, args, { models }) {
      return authController.signUp(args, models);
    }
  }
};

export default resolvers;
