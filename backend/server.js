const app = require("./app");
const connectDB = require("./src/config/db");
require("dotenv").config();
const { PORT, HOST } = require("./src/config/env");

const startServer = async () => {
  try {
    app.listen(PORT || 3000, () => {
      console.log(`Server running at Port: ${PORT || 3000}`);
    });
    await connectDB();
  } catch (error) {
    console.error("Error starting the server: ", error);
  }
};
startServer();
