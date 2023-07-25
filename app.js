const express = require('express')
const app = express()

const PORT = process.env.PORT || 3000

const db = require("./models")

const userRouter = require('./routes/user_route')
const authRouter = require('./routes/auth_route')

app.use('/', express.json())

app.use('/user', userRouter)

app.use('/auth', authRouter)

const start = () => {
    try{
        db.sequelize.sync().then((req) => {
            app.listen(PORT, () => console.log(`Server running at ${PORT}`))
        }).catch((err) => console.error("ERROR TO DB CONNECTION"))
    } catch (e) {
        console.error(e)
    }
}

start()

