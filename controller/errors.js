const logger = require('./service/logger');

module.exports.notfound = (req, res) => {
    logger.error(commonService.sendCustomResult(req, res, 'INVALID_REQUEST', 'INVALID_REQUEST',))
        commonService.sendCustomResult(req, res, 'INVALID_REQUEST', 'INVALID_REQUEST',);

    }