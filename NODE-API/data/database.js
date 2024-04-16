import mongoose from 'mongoose';

export const connectDB = () => {
  mongoose
    .connect(
      'mongodb+srv://abbasbackend:Yaalimadad110@cluster0.bjdhxec.mongodb.net/',
      {
        dbName: 'BackendApi',
      }
    )
    .then((c) => {
      console.log(`connected to the DB ${c.connection.host}`);
    })
    .catch((e) => {
      console.log(e);
    });
};
