import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import dotenv from 'dotenv';

import db from './db';
import typeDefs from './common/type-defs';
import resolvers from './common/resolvers';

import models from './db/models';

dotenv.config({ silent: true });

const PORT = process.env.PORT || 4400;
const API_PATH = process.env.API_PATH || '/gql-api';

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

    server.applyMiddleware({ app, path: API_PATH });

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
