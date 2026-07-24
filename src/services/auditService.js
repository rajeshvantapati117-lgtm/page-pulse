const { createHttpError } = require('../utils/httpErrors');
const { URL } = require('node:url');

class AuditService {
  constructor({ timeoutMs = 5000, maxConcurrentAudits = 10, cacheTtlMs = 60000 } = {}) {
    this.timeoutMs = timeoutMs;
    this.maxConcurrentAudits = maxConcurrentAudits;
    this.cacheTtlMs = cacheTtlMs;
    this.cache = new Map();
    this.inFlight = 0;
  }

  async auditUrl(targetUrl) {
    if (!targetUrl || typeof targetUrl !== 'string') {
      throw createHttpError(400, 'INVALID_INPUT', 'A valid URL is required');
    }

    let parsedUrl;
    try {
      parsedUrl = new URL(targetUrl);
    } catch {
      throw createHttpError(400, 'INVALID_INPUT', 'The URL must be a valid absolute URL');
    }

    if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
      throw createHttpError(400, 'INVALID_INPUT', 'Only http and https URLs are supported');
    }

    const cached = this.cache.get(targetUrl);
    if (cached && Date.now() - cached.timestamp < this.cacheTtlMs) {
      return { ...cached.data, cached: true };
    }

    if (this.inFlight >= this.maxConcurrentAudits) {
      throw createHttpError(429, 'CONCURRENCY_LIMIT_EXCEEDED', 'Too many concurrent audits');
    }

    this.inFlight += 1;

    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), this.timeoutMs);

      const response = await fetch(parsedUrl, { signal: controller.signal, redirect: 'manual' });
      clearTimeout(timer);

      const result = {
        url: targetUrl,
        statusCode: response.status,
        finalUrl: response.headers.get('location') || targetUrl,
        cached: false,
        timestamp: new Date().toISOString(),
      };

      this.cache.set(targetUrl, { data: result, timestamp: Date.now() });
      return result;
    } catch (error) {
      if (error.name === 'AbortError') {
        throw createHttpError(504, 'AUDIT_TIMEOUT', 'The audit request timed out');
      }
      throw createHttpError(502, 'AUDIT_FAILED', 'The URL could not be audited', { detail: error.message });
    } finally {
      this.inFlight -= 1;
    }
  }
}

module.exports = { AuditService };
