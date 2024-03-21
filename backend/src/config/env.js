require("dotenv").config();

const validateEnv = () => {
  const requireEnv = ["HOST", "PORT", "NODE_ENV", "MONGO_URI", "SECRET_KEY"];
  const missingEnv = requireEnv.filter((envVar) => {
    !process.env[envVar];
  });

  if (missingEnv.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingEnv.join(", ")}`
    );
  }
};

validateEnv();

module.exports = {
  HOST: process.env.HOST,
  MONGO_URI: process.env.MONGO_URI,
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  SECRET_KEY: process.env.SECRET_KEY,
};
