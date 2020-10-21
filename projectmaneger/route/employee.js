const express = require("express");
const { createNewEmployee, getEmployeee } = require("../controller/managerment/employeeController");

const {verifitoken} = require("../middelware/verifytoken")

const router = express.Router();
router.post('/employee/',verifitoken,createNewEmployee);
router.get('/employee/:id',verifitoken,getEmployeee);

module.exports = router

