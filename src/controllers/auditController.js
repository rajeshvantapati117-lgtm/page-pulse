const { AuditService } = require('../services/auditService');
const { getConfig } = require('../config/appConfig');

const config = getConfig();
const auditService = new AuditService({
  timeoutMs: config.auditTimeoutMs,
  maxConcurrentAudits: config.maxConcurrentAudits,
  cacheTtlMs: config.cacheTtlMs,
});

async function auditUrl(req, res, next) {
  try {
    const result = await auditService.auditUrl(req.body?.url);
    res.status(200).json({
      success: true,
      data: result,
      requestId: req.id,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { auditUrl };
