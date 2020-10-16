const express = require ('express')
const { loginUsr, registerUsr }=  require ('../controller/adminController');
const { verifitoken } = require('../middelware/verifytoken');

const router = express.Router();

//sign in
router.get('/admins/', loginUsr);

// register
router.post('/admins/', registerUsr);

module.exports = router