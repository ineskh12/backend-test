const mongoose = require("mongoose");


const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://ines07:cr7bale11rmd@cluster0.7mpfm.mongodb.net/test", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    });
    console.log('MongoDB Connected...')
  } catch (error) {
      console.log(error.message);
      //Exit process with failure
      process.exit(1);
  }
};

module.exports = connectDB;
