import mongoose from 'mongoose';
async function connectToMongoDB() {
  const uri = process.env.MONGO_URI;

  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected successfully to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
  }
}
const tempDB = {};

module.exports = { connectToMongoDB, tempDB };
