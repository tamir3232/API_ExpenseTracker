const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const getIncome = async (req, res, next) => {
    try {
        const findTracker = await prisma.tracker.findMany({
            where: {
                userId: req.id
            }
        })

        const findAll = await prisma.income.findMany({
            where: {
                trackerId: findTracker.id
            }
        })
        if (findAll == null) {
            throw {
                code: 400,
                message: 'no money coming in'
            }
        }
        return res.status(200).json({
            code: 200,
            message: 'YOUR INCOME',
            data: findAll
        })
    } catch (error) {
        next(error)
    }
}