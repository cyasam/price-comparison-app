import { ApolloServer } from 'apollo-server-express';
import express from 'express';

import db from './db';
import typeDefs from './common/type-defs';
import resolvers from './common/resolvers';

import models from './db/models';

const PORT = process.env.PORT || 4400;

const startServer = async () => {
  try {
    const app = express();

    await db.connectDB();

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context() {
        return {
          models
        };
      }
    });

    server.applyMiddleware({ app, path: '/gql-api' });

    app.get('*', (req, res) => {
      res.send('Server ready');
    });

    app.listen(PORT, () => {
      console.log(`Server ready`);
    });
  } catch (error) {
    throw new Error(error);
  }
};

startServer();
