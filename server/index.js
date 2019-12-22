import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import dotenv from 'dotenv';
import path from 'path';

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

    if (process.env.NODE_ENV !== 'production') {
      const webpack = await import('webpack');
      const webpackDevMiddleware = await import('webpack-dev-middleware');
      const webpackHotMiddleware = await import('webpack-hot-middleware');
      const webpackConfig = await import('../webpack.config');

      const compiler = webpack.default(webpackConfig.default);
      app.use(
        webpackDevMiddleware.default(compiler, {
          publicPath: webpackConfig.output.publicPath
        })
      );
      app.use(webpackHotMiddleware.default(compiler));
    }

    app.use(express.static('build/client'));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../build/client/index.html'));
    });

    app.listen(PORT, () => {
      console.log(`Server ready`);
    });
  } catch (error) {
    throw new Error(error);
  }
};

startServer();
