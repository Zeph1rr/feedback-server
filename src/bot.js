const TelegramApi = require("node-telegram-bot-api")

bot = new TelegramApi(process.env.BOT_TOKEN, {polling: true})

bot.on('message', msg => console.log(JSON.stringify(msg)))

module.exports = bot