const express = require("express");
const { createNewDepartment, getDepartment } = require("../controller/managerment/departermentController");


const {verifitoken} = require("../middelware/verifytoken")

const router = express.Router();
router.post('/department/',verifitoken,createNewDepartment);
router.get('/department/:id',verifitoken,getDepartment);


module.exports = router

