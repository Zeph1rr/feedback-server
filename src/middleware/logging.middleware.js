const loggingMiddleware = require('logging-middleware-express')


const logPath = process.env.LOG_PATH
const needConsoleLog = process.env.NEED_CONSOLE_LOG
const debugLevel = process.env.DEBUG_LEVEL

module.exports = loggingMiddleware(logPath, debugLevel, needConsoleLog)