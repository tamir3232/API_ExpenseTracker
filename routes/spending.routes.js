const router = require('express').Router()

const { getSpending, addSpending, updateSpending, deleteSpending } = require('../controller/spending.controller')
const { Authorization } = require('../prisma/middlewares/authorization.middleware')
const validation = require('../prisma/middlewares/schema.middlewares')
const registerspending = require('../schema/addspending')
router.get('/', Authorization, getSpending)
router.post('/add', Authorization, validation(registerspending), addSpending)
router.patch('/update', Authorization, updateSpending)
router.delete('/del', Authorization, deleteSpending)

module.exports = router