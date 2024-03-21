const app = require("./app");
const connectDB = require("./src/config/db");
require("dotenv").config();
const { PORT, HOST } = require("./src/config/env");

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running at ${HOST}:${PORT}`);
    });
  } catch (error) {
    console.error("Error starting the server: ", error);
  }
};
startServer();
