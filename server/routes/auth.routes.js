const {Router} = require('express')
const passport = require('passport')
const {login,createUser} = require('../conrollers/auth.controller')
const router = Router()


router.post('/admin/login', login)
router.post(
	'/admin/create',
	passport.authenticate('jwt', {session: false}),
	createUser
)


module.exports = router
