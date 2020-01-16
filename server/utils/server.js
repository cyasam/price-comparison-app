import { ApolloServer } from 'apollo-server-express';

import typeDefs from '../common/type-defs';
import resolvers from '../common/resolvers';
import * as models from '../db/models';
import utils from '../utils';

const API_PATH = process.env.API_PATH || '/gql-api';

const apolloServerInit = app => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    async context({ req }) {
      const token = req.headers.authentication || null;

      const user = await utils.getUser(token);

      return {
        user,
        models
      };
    }
  });

  server.applyMiddleware({ app, path: API_PATH });
};

export default apolloServerInit;
