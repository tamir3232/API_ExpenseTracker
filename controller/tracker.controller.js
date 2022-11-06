
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const addTracker = async (req, res, next) => {
    try {
        const bodies = req.body
        const trackerExist = await prisma.tracker.findMany({
            where: {
                userId: req.id
            }
        })

        if (trackerExist.length > 0) {
            throw {
                code: 400,
                message: 'Your wallet is exist'
            }
        }
        const createTracker = await prisma.tracker.create({
            data: {
                money: bodies.money,
                userId: req.id
            }
        })
        return res.status(200).json({
            code: 200,
            message: "Money added"
        })
    } catch (error) {
        next(error)

    }
}

const getTracker = async (req, res, next) => {
    try {
        const trackerExist = await prisma.tracker.findMany({
            where: {
                userId: req.id
            }
        })
        if (!trackerExist) {
            throw {
                code: 400,
                message: 'Your wallet is not exist'
            }
        }
        return res.status(200).json({
            code: 200,
            message: trackerExist
        })
    } catch (error) {

    }
}
const delTracker = async (req, res, next) => {
    try {
        const findTracker = await prisma.tracker.findMany({
            where: {
                userId: req.id
            }
        })
        const delincome = await prisma.income.deleteMany({
            where: {
                trackerId: findTracker[0].id,
            }
        })
        const delspend = await prisma.spend.deleteMany({
            where: {
                trackerId: findTracker[0].id,
            }
        })
        const delTracker = await prisma.tracker.deleteMany({
            where: {
                userId: req.id
            }
        })

        return res.status(200).json({
            code: 200,
            message: "deleted your wallet"
        })
    } catch (error) {
        next(error)
    }
}

module.exports = { addTracker, getTracker, delTracker }