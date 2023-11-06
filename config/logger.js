const { createLogger, transports, format } = require('winston'); 
const winston = require('winston-cloudwatch');
const dotenv = require('dotenv');
dotenv.config();

const logger = createLogger({
  level: 'info',
  format: format.json(), 
  defaultMeta: { service: 'csye6225' },
  transports: [
    new transports.Console(),
    new transports.CloudWatch({
      logGroupName: 'csye6225',
      logStreamName: 'webapp',
      createLogGroup: true,
      createLogStream: true,
      submissionInterval: 5000,
      submissionRetryCount: 1,
      batchSize: 20,
      awsRegion: 'us-east-1',
    }),
  ],
});

module.exports = logger;
