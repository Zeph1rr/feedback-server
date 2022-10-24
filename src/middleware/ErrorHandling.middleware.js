const ApiError = require('../error/ApiError')
let titles = require('./../constants/constants')['Ru']
const logger = require('logging-middleware-express/log')

module.exports = function (err, req, res, next) {
    if (err instanceof ApiError) {
        const response = {data: {status: err.status, message: err.message, errors: err.errors}}
        logger(process.env.LOG_PATH, {type: "RESPONSE", ...response}, true)
        return res.status(err.status).json(response)
    }
    const response = {data: {status: 500, message: titles.internal_message, err_message: err.message}}
    logger(process.env.LOG_PATH, {type: "RESPONSE", ...response}, true)
    return res.status(500).json(response)
}