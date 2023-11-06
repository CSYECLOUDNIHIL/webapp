const { createLogger, transports, format } = require('winston'); 
const winston = require('winston-cloudwatch');
const dotenv = require('dotenv');
dotenv.config();

const logger = createLogger({
  level: 'info',
  format: format.json(), 
  defaultMeta: { service: 'csye6225' },
  transports: [new transports.File({ filename: '/var/log/csye6225.log' })],
});

module.exports = logger;
