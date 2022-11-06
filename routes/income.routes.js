const router = require('express').Router()

const { getIncome, addIncome, updateIncome, deleteIncome } = require('../controller/income.controller')
const { Authorization } = require('../prisma/middlewares/authorization.middleware')
const validation = require('../prisma/middlewares/schema.middlewares')
const registerIncome = require('../schema/addincome')
router.get('/', Authorization, getIncome)
router.post('/add', Authorization, validation(registerIncome), addIncome)
router.patch('/update', Authorization, updateIncome)
router.delete('/del', Authorization, deleteIncome)

module.exports = router