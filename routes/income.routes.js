const router = require('express').Router()

const { getIncome, addIncome, updateIncome, deleteIncome } = require('../controller/income.controller')
const { Authorization } = require('../prisma/middlewares/authorization.middleware')

router.get('/', Authorization, getIncome)
router.post('/add', Authorization, addIncome)
router.patch('/update', Authorization, updateIncome)
router.delete('/del', Authorization, deleteIncome)

module.exports = router