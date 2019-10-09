const { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file');
const fs = require('fs');
const path = require('path');

const env = process.env.NODE_ENV || 'development';
const logDir = 'logs';

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

const dailyRotateFileTransport = new transports.DailyRotateFile({
    filename: `${logDir}/%DATE%-results.log`,
    datePattern: 'YYYY-MM-DD'
});

const logger = createLogger({
    level: env === 'production' ? 'info' : 'debug',
    format: format.combine(
        format.label({ label: path.basename(process.mainModule.filename) }),
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' })
    ),
    // change level if in dev environment versus production
    transports: [
        new transports.File({
            level: 'silly',
            filename: './logs/%DATE%all-logs.log',
            
            format: format.combine(
                format.label({ label: path.basename(process.mainModule.filename) }),
                format.colorize(),
                format.simple(),
                format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                format.printf(
                    info => `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`
                ),
            )
        }),
        dailyRotateFileTransport
    ]
});
logger.info("info")
logger.error("error")

