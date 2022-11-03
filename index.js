require('dotenv').config()
const { PrismaClient } = require('@prisma/client')
const express = require('express')
const prisma = new PrismaClient()
const cors = require('cors')
const app = express()
const port = process.env.PORT

console.log(port)