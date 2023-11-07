const StatsD = require('node-statsd');
const dotenv = require('dotenv');
dotenv.config();

const statsdClient = new StatsD({
  host: 'localhost', 
  port: process.env.STATSD_PORT, 
});

module.exports = statsdClient;
