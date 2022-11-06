const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const getSpending = async (req, res, next) => {
    try {
        const findTracker = await prisma.tracker.findMany({
            where: {
                userId: req.id
            }
        })
        if (!findTracker || findTracker.length <= 0) {
            throw {
                code: 400,
                message: 'user belum buat tracker '
            }
        }

        const findAll = await prisma.spend.findMany({
            where: {
                trackerId: findTracker[0].id
            }
        })
        if (findAll == null || !findAll) {
            throw {
                code: 400,
                message: 'no money coming in'
            }
        }
        return res.status(200).json({
            code: 200,
            message: 'YOUR Spend',
            data: findAll
        })
    } catch (error) {
        next(error)
    }
}
const addSpending = async (req, res, next) => {
    try {
        const bodies = req.body
        const findTracker = await prisma.tracker.findMany({
            where: {
                userId: req.id
            },



        })

        if (!findTracker) {
            throw {
                code: 400,
                message: 'user belum buat tracker '
            }
        }
        const createIncome = await prisma.spend.create({
            data: {
                spendingMoney: bodies.spendingMoney,
                description: bodies.description,
                trackerId: findTracker[0].id
            }
        })

        const updateTracker = await prisma.tracker.updateMany({
            where: {
                userId: req.id
            },
            data: {
                money: findTracker[0].money - bodies.spendingMoney
            }
        })
        return res.status(200).json({
            code: 200,
            message: "spend activity registered"
        })
    } catch (error) {
        next(error)
    }
}


const updateSpending = async (req, res, next) => {
    try {
        const bodies = req.body
        const findTracker = await prisma.tracker.findMany({
            where: {
                userId: req.id
            }
        })
        if (!findTracker) {
            throw {
                code: 400,
                message: 'user belum buat tracker '
            }
        }
        const updatee = await prisma.todo.updateMany({
            where: {
                trackerId: findTracker[0].id,
                id: bodies.id
            },
            data: {
                spendingMoney: bodies.description,
                description: bodies.description

            }
        })
        return res.status(200).json({
            code: 200,
            message: "spend updated"
        })

    } catch (error) {
        next(error)
    }
}

const deleteSpending = async (req, res, next) => {
    try {
        const bodies = req.body
        const id = req.params.id
        const findTracker = await prisma.tracker.findMany({
            where: {
                userId: req.id
            }
        })
        if (!findTracker) {
            throw {
                code: 400,
                message: 'user belum buat tracker '
            }
        }
        const dell = await prisma.spend.deleteMany({
            where: {
                trackerId: findTracker[0].id,
                id: Number(id)
            },
        })
        return res.status(200).json({
            code: 200,
            message: "spend deleted"
        })

    } catch (error) {
        next(error)
    }
}

module.exports = { getSpending, addSpending, updateSpending, deleteSpending }