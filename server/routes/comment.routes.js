const {Router} = require('express')
const {create} = require('../conrollers/comment.controller')
const router = Router()

router.post('/', create)

module.exports = router
