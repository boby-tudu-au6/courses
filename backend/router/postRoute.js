const router = require("express").Router()
import post from '../controllers/postRoute'

router.post('/login',post.login)
router.post('/checklogin',post.checkLogin)
   
module.exports = router; 