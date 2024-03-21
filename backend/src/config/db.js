const mongoose = require("mongoose");
const { mongoUri } = require("./env");

const connectDB = async (attempts = 5) => {
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("MongoDB Connected");
  } catch (error) {
    console.error(`Database connection error: ${error.message}`);
    if (attempts > 0) {
      console.log(`Retrying connection (${attempts} attempts left)...`);
      setTimeout(() => connectDB(attempts - 1), 5000); // Wait 5 seconds before retrying
    } else {
      process.exit(1); // Exit after exhausting retries
    }
  }
};

module.exports = connectDB;
