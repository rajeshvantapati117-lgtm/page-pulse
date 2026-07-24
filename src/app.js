const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const { requestIdMiddleware } = require('./middleware/requestId');
const { createRateLimiter } = require('./middleware/rateLimiter');
const { errorHandler } = require('./middleware/errorHandler');
const auditRoutes = require('./routes/auditRoutes');
const { getConfig } = require('./config/appConfig');

dotenv.config();

const app = express();
const config = getConfig();
const rateLimiter = createRateLimiter({
  windowMs: config.rateLimitWindowMs,
  maxRequests: config.rateLimitMaxRequests,
});

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(requestIdMiddleware);
app.use(rateLimiter);

app.get('/', (req, res) => {
  res.json({ message: 'page-pulse is running' });
});

app.get('/healthz', (req, res) => {
  res.json({ status: 'ok', requestId: req.id });
});

app.use('/api', auditRoutes);
app.use(errorHandler);

module.exports = app;
