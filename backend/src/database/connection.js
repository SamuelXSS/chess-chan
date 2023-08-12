import mongoose from 'mongoose';

const connectToDB = (MONGODB_URL, MONGODB_DATABASE) =>
  mongoose.connect(`${MONGODB_URL}/${MONGODB_DATABASE}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

export default connectToDB;
