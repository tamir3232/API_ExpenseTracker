const router = require('express').Router()
const { register, login, get, del, update } = require('../controller/user.controller')
const registerSchema = require('../schema/adduser')
const validation = require('../prisma/middlewares/schema.middlewares')

router.get('/', get)
router.post('/register', validation(registerSchema), register)
router.post('/login', login)
router.delete('/:id', del)
router.patch('/:id', update)



module.exports = router