import mongoose from 'mongoose';

const connectToDB = (MONGODB_URL, MONGODB_DATABASE) => {
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 3000,
  };

  const connect = () => {
    mongoose
      .connect(`${MONGODB_URL}/${MONGODB_DATABASE}`, options)
      .then(() => {
        console.log('Connected to MongoDB');
      })
      .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
        setTimeout(connect, 5000);
      });
  };

  connect();

  mongoose.connection.on('disconnected', () => {
    console.log('MongoDB connection lost. Reconnecting...');
    connect();
  });
};

export default connectToDB;
