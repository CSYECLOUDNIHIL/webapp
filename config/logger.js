const { createLogger, transports, format } = require('winston');
const dotenv = require('dotenv');
dotenv.config();

const logger = createLogger({
  level: 'info',
  format: format.combine(format.timestamp(), format.json()),
  defaultMeta: { service: 'csye6225' },
  transports: [new transports.File({ filename: '/logs/csye6225.log' })],
});

module.exports = logger;
