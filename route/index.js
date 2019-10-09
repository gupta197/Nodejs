const express = require('express')
var _ = require('lodash')

const router = express.Router()

var logger = require('../config/logger')    //logger for store the error into the file
var winston = require('../config/winston')  // winston use for store error into the server
var logModel = require('../models/log_model')

//home page
router.get('/', (req, res) => {
    let method = Object.keys(req.route['methods'])
    logger.info(`${req.originalUrl} ip : ${req.ip} methods: ${method} protocols: ${req.protocol} hostname: ${req.hostname}`)
    winston.info(`${req.originalUrl} ip : ${req.ip} protocols: ${req.protocol} hostname: ${req.hostname}`)
    res.send("Welcome to home page <br> <a href='/error'>")

});
// APi for check error 
router.get('/error', async (req, res) => {
    let cache =  await logModel.find({});
    var detail = [];
    try {
        cache.forEach(element => {
            let add = {
                "level": element['level'],
                "timestamp": element['timestamp'],
                "message": element['message'],
            }
            detail.push(add)
        })
        logger.info(`homepage : ${req.originalUrl} ip : ${req.ip} protocols: ${req.protocol} hostname: ${req.hostname}`)
        winston.info(`homepage : ${req.originalUrl} ip : ${req.ip} protocols: ${req.protocol} hostname: ${req.hostname}`)
        res.render('error', { detail })

    }
    catch (err) {
        logger.error(`${err}`)
        winston.error(`${err}`)
        console.log(err)
    }
});
//API FOR filter the logger errors
router.post('/error', async (req, res) => {
    let cache =  await logModel.find({level: req.body.level});
    var detail = [];
    cache.forEach(element => {
        let add = {
            "level": element['level'],
            "timestamp": element['timestamp'],
            "message": element['message'],
        }
        detail.push(add)
    })
    
    logger.info(` ${req.originalUrl} ip : ${req.ip}  protocols: ${req.protocol} hostname: ${req.hostname}`)
    res.render('error', { detail })

})

module.exports = router;