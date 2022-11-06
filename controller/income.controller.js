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
        if (!findTracker) {
            throw {
                code: 400,
                message: 'user belum buat tracker '
            }
        }

        const findAll = await prisma.income.findMany({
            where: {
                trackerId: findTracker.id
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
            }
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
                trackerId: findTracker.id
            }
        })
        return res.status(200).json({
            code: 200,
            message: "income activity registered"
        })
    } catch (error) {

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
        const updatee = await prisma.todo.updateMany({
            where: {
                trackerId: findTracker.id,
                id: bodies.id
            },
            data: {
                incomeMoney: bodies.description,
                description: bodies.description

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
        const dell = await prisma.income.deleteMany({
            where: {
                trackerId: findTracker.id,
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