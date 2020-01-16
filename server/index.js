import express from 'express';
import dotenv from 'dotenv';
import path from 'path';

import db from './db';
import apolloServerInit from './utils/server';

dotenv.config({ silent: true });

const PORT = process.env.PORT || 4400;

const startServer = async () => {
  try {
    const app = express();

    await db.connectDB();

    apolloServerInit(app);

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
