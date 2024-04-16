import mongoose from 'mongoose';

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('connected to the DB');
  })
  .catch((e) => {
    console.log(e);
  });
