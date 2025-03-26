const express=require('express');
const router = express.Router();
const { HandleUserSignup, HandleUserLogin } = require('../Controllers/user');

router.post('/',HandleUserSignup);
router.post('/login',HandleUserLogin);

module.exports=router;