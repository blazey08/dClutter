const errorResponse = (res, status, message, error = null) => {
  const response = { message };
  if (error) {
    response.error = error;
  }
  res.status(status).json(response);
};

module.exports = httpResponse;
