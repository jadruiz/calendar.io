const { environment } = require("../../../config/env");

const errorHandler = (err, req, res, next) => {
  //Determine the response status code. If the error has a status; otherwise, use 500
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  //Send an error response in JSON format
  res.json({
    message: err.message,
    // Include the error stack only if the application is in development
    stack: environment === "development" ? err.stack : undefined,
  });
};

module.exports = errorHandler;
