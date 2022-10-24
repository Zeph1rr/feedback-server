const Router = require('express')
const router = new Router()
const botRouter = require("./bot.routes")


router.use('/bot', botRouter)

module.exports = router