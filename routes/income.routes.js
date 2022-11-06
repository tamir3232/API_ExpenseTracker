const router = require('express').Router()

const { getIncome, addIncome, updateIncome, deleteIncome } = require('../controller/income.controller')
// const {Authorization} == require('../prisma/middlewares/authorization.middleware')

router.get('/', getIncome)
router.post('/add', addIncome)
router.patch('/update', updateIncome)
router.delete('/del', deleteIncome)

module.exports = router