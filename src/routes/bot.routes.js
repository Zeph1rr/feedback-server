const Router = require('express')
const router = new Router()
const multer = require('multer')
const upload = multer()
const controller = require('../controllers/bot.controller')

const loggingMiddleware = require('../middleware/logging.middleware')
const path = require("path");

router.post('/', upload.array('files'), loggingMiddleware, controller.sendMessage)

module.exports = router