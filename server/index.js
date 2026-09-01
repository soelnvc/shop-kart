import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

const app = express()
const Port = 8085

dotenv.config()

mongoose.connect(process.env.dbUrl).then(() => {
    console.log("Db Connected")
}).catch((err) => {
    console.log(err)
})

app.get('/', (req, res) => {
    res.send('Sever On Hellllooooo...')
})

app.listen(Port, () => {
    console.log(`Server Startet at ${Port}`)
})