const errorHandler = (err, req, res, next) => {
  const statusCode = err.status || 500;

  res.status(statusCode).json({
    message:
      err.message ||
      "An error occurred on the server, please double-check your request!",
  });
};

export default errorHandler;
