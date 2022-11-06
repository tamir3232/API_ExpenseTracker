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
const addIncome = async (req, res, next) => {
    try {
        const bodies = req.body
        const findTracker = await prisma.tracker.findMany({
            where: {
                userId: req.id
            }
        })
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
        const dell = await prisma.income.deleteMany({
            where: {
                trackerId: findTracker.id,
                id: Number(id)
            },
        })

    } catch (error) {

    }
}