require('dotenv').config()
const { PrismaClient } = require('@prisma/client')
const express = require('express')
const prisma = new PrismaClient()
const cors = require('cors')
const app = express()
const port = process.env.PORT
const incomeRouter = require('./routes/income.routes')

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', async (req, res) => {
    res.send({
        Message: "SELAMAT DATANG DI EXPENSE TRACKER"
    })
})

app.use('/income', incomeRouter)




app.use((err, req, res, next) => {
    return res.status(err.code || 500).json({
        message: err.message || 'internal server eror'
    })
})

app.listen(port, () => {
    console.log(`SERVER RUNING ATT PORT ${port}`)
})

module.exports = { app }