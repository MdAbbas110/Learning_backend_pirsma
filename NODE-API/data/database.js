import mongoose from 'mongoose';

export const connectDB = () => {
  mongoose
    .connect(process.env.MONGODB_URI, {
      dbName: 'BackendApi',
    })
    .then((c) => {
      console.log(`connected to the DB ${c.connection.host}`);
    })
    .catch((e) => {
      console.log(e);
    });
};
