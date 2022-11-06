const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { description } = require('../schema/addincome')


const getIncome = async (req, res, next) => {
    try {
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

        const findAll = await prisma.income.findMany({
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
            message: 'YOUR INCOME',
            data: findAll
        })
    } catch (error) {
        next(error)
    }
}
const addIncome = async (req, res, next) => {
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
        const createIncome = await prisma.income.create({
            data: {
                incomeMoney: bodies.incomeMoney,
                description: bodies.description,
                trackerId: findTracker[0].id
            }
        })

        const updateTracker = await prisma.tracker.updateMany({
            where: {
                userId: req.id
            },
            data: {
                money: findTracker[0].money + bodies.incomeMoney
            }
        })
        return res.status(200).json({
            code: 200,
            message: "income activity registered"
        })
    } catch (error) {
        next(error)
    }
}


const updateIncome = async (req, res, next) => {
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

        const findmoney = await prisma.income.findMany({
            where: {
                trackerId: findTracker[0].id,
                id: bodies.id
            }
        })

        const updateTracker = await prisma.tracker.updateMany({
            where: {
                userId: req.id,

            },
            data: {
                money: findTracker[0].money - findmoney[0].incomeMoney,
            }
        })


        const findTrackerr = await prisma.tracker.findMany({
            where: {
                userId: req.id
            }
        })
        const updatee = await prisma.income.updateMany({
            where: {
                trackerId: findTracker[0].id,
                id: bodies.id
            },
            data: {
                incomeMoney: bodies.incomeMoney,
                description: bodies.description,

            }
        })
        const updateTrackerr = await prisma.tracker.updateMany({
            where: {
                userId: req.id
            },
            data: {
                money: findTrackerr[0].money + bodies.incomeMoney
            }
        })
        return res.status(200).json({
            code: 200,
            message: "income updated"
        })

    } catch (error) {
        next(error)
    }
}

const deleteIncome = async (req, res, next) => {
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
        const findmoney = await prisma.income.findMany({
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
                money: findTracker[0].money - findmoney[0].incomeMoney
            }
        })
        const dell = await prisma.income.deleteMany({
            where: {
                trackerId: findTracker[0].id,
                id: Number(id)
            },
        })
        return res.status(200).json({
            code: 200,
            message: "income deleted"
        })

    } catch (error) {
        next(error)
    }
}

module.exports = { getIncome, addIncome, updateIncome, deleteIncome }