const loggerMiddleware = (req, res, next) => {
  const startTime = new Date();
  //This function is called once the response has been sent to the client.
  res.on("finish", () => {
    const endTime = new Date();
    const responseTime = endTime - startTime;
    console.log(
      `${req.method} ${req.originalUrl} ${res.statusCode} ${responseTime}ms`
    );
  });
  next;
};

module.exports = loggerMiddleware;
