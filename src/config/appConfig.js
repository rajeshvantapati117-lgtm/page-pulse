const DEFAULTS = {
  auditTimeoutMs: 5000,
  maxConcurrentAudits: 10,
  cacheTtlMs: 60000,
  rateLimitWindowMs: 60000,
  rateLimitMaxRequests: 60,
};

function getConfig() {
  return {
    auditTimeoutMs: Number(process.env.AUDIT_TIMEOUT_MS || DEFAULTS.auditTimeoutMs),
    maxConcurrentAudits: Number(process.env.MAX_CONCURRENT_AUDITS || DEFAULTS.maxConcurrentAudits),
    cacheTtlMs: Number(process.env.CACHE_TTL_MS || DEFAULTS.cacheTtlMs),
    rateLimitWindowMs: Number(process.env.RATE_LIMIT_WINDOW_MS || DEFAULTS.rateLimitWindowMs),
    rateLimitMaxRequests: Number(process.env.RATE_LIMIT_MAX_REQUESTS || DEFAULTS.rateLimitMaxRequests),
  };
}

module.exports = { getConfig };
