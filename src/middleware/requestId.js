const crypto = require('node:crypto');
const { createLogger } = require('../logger/logger');

function requestIdMiddleware(req, res, next) {
  const requestId = req.get('x-request-id') || crypto.randomUUID();
  req.id = requestId;
  req.log = createLogger(req);
  res.setHeader('x-request-id', requestId);
  req.log.info('request received', {
    method: req.method,
    path: req.originalUrl,
    ip: req.ip,
  });
  next();
}

module.exports = { requestIdMiddleware };
