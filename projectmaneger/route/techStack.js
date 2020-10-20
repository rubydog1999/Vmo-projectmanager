const express = require("express")
const {verifitoken} = require("../middelware/verifytoken")
const {createNewStack, getTechStackDetail, getListTechStack} = require("../controller/techStackController")
const router = express.Router();
router.post('/stacks/',verifitoken,createNewStack);
router.get('/stacks/:id',verifitoken,getTechStackDetail);
router.get('/stacks/',verifitoken,getListTechStack);
module.exports = router

