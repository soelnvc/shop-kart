import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import customerRoutes from './routes/customer.route.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express()
const Port = 8085

app.use(cookieParser())
app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true,
    })
)
dotenv.config()

mongoose.connect(process.env.dbUrl).then(() => {
    console.log("Db Connected")
}).catch((err) => {
    console.log(err)
})

app.use(express.json())
app.use('/customers' , customerRoutes)

app.get('/', (req, res) => {
    res.send('Sever On Hellllooooo...')
})

app.listen(Port, () => {
    console.log(`Server Startet at ${Port}`)
})