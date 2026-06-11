import mongoose from 'mongoose';

async function connectToDB() {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => {
      console.log('DB connected successfully');
    })
    .catch((error) => {
      console.error('DB connection error:', error);
      process.exit(1);
    }); 
}

export default connectToDB;
