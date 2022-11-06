const router = require('express').Router()
const { addTracker, getTracker, delTracker } = require('../controller/tracker.controller')
const { Authorization } = require('../prisma/middlewares/authorization.middleware')
router.get('/', Authorization, getTracker)
router.post('/add', Authorization, addTracker)
router.delete('/delete', Authorization, delTracker)

module.exports = router