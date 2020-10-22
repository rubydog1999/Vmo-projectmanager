const express = require("express");
const { createNewEmployee, getEmployeee, getEmployeeeList } = require("../controller/managerment/employeeController");

const {verifitoken} = require("../middelware/verifytoken")

const router = express.Router();
router.post('/employee/',verifitoken,createNewEmployee);
router.get('/employee/:id',verifitoken,getEmployeee);
router.get('/employee/',verifitoken,getEmployeeeList)
module.exports = router

