const router = require('express').Router()
const { addTracker, getTracker, delTracker } = require('../controller/tracker.controller')
const { Authorization } = require('../prisma/middlewares/authorization.middleware')
const registerstracker = require('../schema/addtracker')
const validation = require('../prisma/middlewares/schema.middlewares')
router.get('/', Authorization, getTracker)
router.post('/add', Authorization, validation(registerstracker), addTracker)
router.delete('/delete', Authorization, delTracker)

module.exports = router