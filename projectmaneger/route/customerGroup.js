const express = require("express");
const { createNewCustomerGroup,getCustomerGroup, getListCustomerGroup, updateCustomerGroup, deleteCustomerGroup } = require("../controller/customerGroupController");

const {verifitoken} = require("../middelware/verifytoken")

const router = express.Router();
router.post('/customer/',verifitoken,createNewCustomerGroup);
router.get('/customer/:id',verifitoken,getCustomerGroup);
router.get('/customer/',verifitoken,getListCustomerGroup);
router.put('/customer/:id',verifitoken,updateCustomerGroup);
router.delete('/customer/:id',verifitoken,deleteCustomerGroup)
module.exports = router

