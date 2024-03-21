require("dotenv").config();

const validateEnv = () => {
  const requireEnv = ["MONGO_URI", "PORT", "NODE_ENV", "SECRET_KEY"];
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
  mongoUri: process.env.MONGO_URI,
  port: process.env.PORT,
  environment: process.env.NODE_ENV,
  secretKey: process.env.SECRET_KEY,
};
