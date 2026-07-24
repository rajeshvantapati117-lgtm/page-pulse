function createLogger(req) {
  const requestId = req?.id || 'unknown';

  return {
    info(message, details = {}) {
      console.info(JSON.stringify({ level: 'info', message, requestId, timestamp: new Date().toISOString(), ...details }));
    },
    error(message, details = {}) {
      console.error(JSON.stringify({ level: 'error', message, requestId, timestamp: new Date().toISOString(), ...details }));
    },
  };
}

module.exports = { createLogger };
