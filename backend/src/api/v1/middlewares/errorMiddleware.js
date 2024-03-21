const { NODE_ENV } = require("../../../config/env");

const errorHandler = (err, req, res, next) => {
  //Determine the response status code. If the error has a status; otherwise, use 500
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  //Send an error response in JSON format
  res.json({
    message: err.message,
    // Include the error stack only if the application is in development
    stack: NODE_ENV === "development" ? err.stack : undefined,
  });
};

module.exports = errorHandler;
