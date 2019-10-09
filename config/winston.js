const path = require('path');

const Winston = require('winston');
require('winston-mongodb');

var winston = new Winston.createLogger({
    levels: Winston.config.syslog.levels,
    transports: [
        new Winston.transports.MongoDB({
            capped: true,
            db: 'mongodb://localhost:27017/log-win',
            name: 'logs',
            collection: 'logs',
            options: {
                poolSize: 2,
                autoReconnect: true,
                useNewUrlParser: true,
                useUnifiedTopology: true
            },
        }),
    ]
})
module.exports = winston;