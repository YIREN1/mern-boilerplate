const mongoose = require('mongoose'); 
const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log(`Connected to: ${connection.connection.host}`.cyan.underline.bold);
  } catch (error) {
    console.log(`Database error: ${error}`.red);
    process.exit(1);
  }
};
module.exports = connectDB;
