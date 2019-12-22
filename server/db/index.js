import mongoose from 'mongoose';

export default {
  connectDB: async () => {
    try {
      let mongoUserCredentials = '';
      if (process.env.MONGO_USER && process.env.MONGO_PASSWORD) {
        mongoUserCredentials = `${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@`;
      }

      const MONGO_URL = process.env.MONGO_URL;
      const DB_NAME = process.env.MONGO_DB_NAME;
      const MONGO_CONNECTION_STRING = `mongodb://${mongoUserCredentials}${MONGO_URL}/${DB_NAME}`;

      return await mongoose.connect(MONGO_CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      });
    } catch (err) {
      throw new Error(err);
    }
  }
};
