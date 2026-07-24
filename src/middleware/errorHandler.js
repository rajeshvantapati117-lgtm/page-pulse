function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const code = err.code || 'INTERNAL_SERVER_ERROR';
  const payload = {
    error: {
      code,
      message: err.message || 'Unexpected error',
    },
    requestId: req.id,
  };

  if (err.details) {
    payload.error.details = err.details;
  }

  req.log.error('request failed', { statusCode, code, message: err.message });
  res.status(statusCode).json(payload);
}

module.exports = { errorHandler };
