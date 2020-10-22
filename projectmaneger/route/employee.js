const express = require("express");
const { createNewEmployee, getEmployeee, getEmployeeeList, updateEmployee } = require("../controller/managerment/employeeController");

const {verifitoken} = require("../middelware/verifytoken")

const router = express.Router();
router.post('/employee/',verifitoken,createNewEmployee);
router.get('/employee/:id',verifitoken,getEmployeee);
router.get('/employee/',verifitoken,getEmployeeeList);
router.put('/employee/:id',verifitoken,updateEmployee);
module.exports = router

