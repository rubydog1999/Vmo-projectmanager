const winston = require('winston');
require('winston-daily-rotate-file');
 
  var transport = new (winston.transports.DailyRotateFile)({
    filename: '%DATE%.log',
    dirname: './logs/',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
  });
 
 
const logger = winston.createLogger({
    transports: [
      transport
    ]
  });

module.exports = logger
