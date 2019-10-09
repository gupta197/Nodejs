const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  level: 'error',
  format: format.combine(format.colorize(),format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss'
  }),
  format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
),
  // You can also comment out the line above and uncomment the line below for JSON format
  // format: format.json(),
  transports: [new transports.Console()]
});

logger.info('Hello world');
logger.debug('Debugging info');
logger.silly('Very verbose silly message');
logger.verbose('verbose message');
logger.warn("This massage to warn for any error occur before")
logger.error("error message")