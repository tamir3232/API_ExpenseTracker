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
        const createSpend = await prisma.spend.create({
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
        const findmoney = await prisma.spend.findMany({
            where: {
                trackerId: findTracker[0].id,
                id: bodies.id
            }
        })
        console.log(findmoney[0].spendingMoney)
        const updateTracker = await prisma.tracker.updateMany({
            where: {
                userId: req.id,

            },
            data: {
                money: findTracker[0].money + findmoney[0].spendingMoney,
            }
        })

        const findTrackerr = await prisma.tracker.findMany({
            where: {
                userId: req.id
            }
        })
        const updatee = await prisma.spend.updateMany({
            where: {
                trackerId: findTracker[0].id,
                id: bodies.id
            },
            data: {
                spendingMoney: bodies.spendingMoney,
                description: bodies.description

            }
        })
        const updateTrackerr = await prisma.tracker.updateMany({
            where: {
                userId: req.id
            },
            data: {
                money: findTrackerr[0].money - bodies.spendingMoney
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
        const findmoney = await prisma.spend.findMany({
            where: {
                trackerId: findTracker[0].id,
                id: Number(id)
            },
        })
        const updatedmoney = await prisma.tracker.updateMany({
            where: {
                userId: req.id
            },
            data: {
                money: findTracker[0].money + findmoney[0].spendingMoney
            }
        })
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