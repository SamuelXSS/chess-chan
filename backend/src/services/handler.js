const errorHandler = (statusCode, message, res) => {
  res.status(statusCode).json({
    message
  });
};

const successHandler = (statusCode, message, res) => {
  res.status(statusCode).json({
    message
  });
};

export { errorHandler, successHandler };
