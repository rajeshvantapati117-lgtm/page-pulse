const { createHttpError } = require('../utils/httpErrors');

function createRateLimiter({ windowMs, maxRequests }) {
  const requests = new Map();

  return function rateLimiter(req, res, next) {
    const clientKey = req.get('x-forwarded-for') || req.ip || 'unknown';
    const now = Date.now();
    const windowStart = now - windowMs;

    const entries = requests.get(clientKey) || [];
    const recentEntries = entries.filter((timestamp) => timestamp > windowStart);

    if (recentEntries.length >= maxRequests) {
      const err = createHttpError(429, 'RATE_LIMIT_EXCEEDED', 'Too many requests');
      return next(err);
    }

    recentEntries.push(now);
    requests.set(clientKey, recentEntries);
    next();
  };
}

module.exports = { createRateLimiter };
