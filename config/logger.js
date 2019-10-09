const path = require('path');

const Winston = require('winston');
require('winston-mongodb');

var logger = new Winston.createLogger({
    level: 'silly',
    format: Winston.format.combine(
        Winston.format.label({ label: path.basename(process.mainModule.filename) }),
        Winston.format.colorize(),
        Winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        Winston.format.printf(
            info => `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`
        ),
    ),
    transports: [
        new Winston.transports.File({
            filename: './logs/all-logs.log'
        }),
    ]
})

module.exports = logger;

