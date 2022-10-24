require('dotenv').config()
const express = require('express')
const cors = require('cors')
const errorHandler = require('./middleware/ErrorHandling.middleware')
const router = require('./routes/index')
const path = require("path")



const PORT = process.env.PORT || 3000

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/v1', router)

const root = (process.platform === "win32") ? path.join(__dirname, '..', 'client', 'build') : path.join(__dirname, 'build')
app.use(express.static(root));
app.use(express.static(path.join(root, "static")));
app.get("*", (req, res) => {
    res.sendFile('index.html', { root });
})

app.use(errorHandler)

const start = async () => {
    try {
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`)
        })
    } catch (e) {
        console.log(`ERROR: ${e}`)
    }

}

start()