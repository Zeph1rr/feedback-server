const bot = require("../bot")
const ApiError = require("../error/ApiError")
const chats = process.env.CHATS.split(',')
const logger = require('logging-middleware-express/log')
const titles = require('./../constants/constants')['En']



class botController{
    sendMessage(req, res, next) {
        const {text, nickname} = req.body
        if (!text) {
            return next(ApiError.badRequest(titles.text_required_error))
        }
        let response = {
            message: titles.success_title,
            data: {
                chats,
                text,
            }
        }
        try {
            chats.forEach(async chat => {
                let message = text
                if (nickname) {
                    message = `${titles.feedback}: ${nickname}\n\n${text}`
                }
                await bot.sendMessage(chat, message)
                if (req.files.length) {
                    for (const file of req.files) {
                        const filename = `attachment.${file.originalname.split('.')[1]}`
                        await bot.sendDocument(chat, file.buffer, {}, {filename: filename, contentType: file.mimetype})
                    }
                }
            })
            if (req.files.length) {
                response = {...response, files: `attachment.${req.files[0].originalname.split('.')[1]}`}
            }
            logger(process.env.LOG_PATH, {type: "RESPONSE", ...response}, true)
            return res.json(response)
        } catch (e) {
            return next(ApiError.internal(e))
        }
    }
}

module.exports = new botController()