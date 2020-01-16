import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import dotenv from 'dotenv';
import path from 'path';

import db from './db';
import typeDefs from './common/type-defs';
import resolvers from './common/resolvers';

import * as models from './db/models';
import utils from './utils';

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

    app.use(express.static('build/client'));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../build/client/index.html'));
    });

    app.listen(PORT, () => {
      console.log(`Server ready`);
    });
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

startServer();
