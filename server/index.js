import { ApolloServer } from 'apollo-server';

import db from './db';
import typeDefs from './common/type-defs';
import resolvers from './common/resolvers';

import models from './db/models';

const PORT = process.env.PORT || 4400;

const startServer = async () => {
  try {
    await db.connectDB();

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      cacheControl: {
        defaultMaxAge: 5
      },
      context() {
        return {
          models
        };
      }
    });

    server.listen({ port: PORT }).then(({ url }) => {
      console.log(`Server ready at ${url}`);
    });
  } catch (error) {
    throw new Error(error);
  }
};

startServer();
