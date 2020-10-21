const express = require("express")
const {verifitoken} = require("../middelware/verifytoken")
const {createNewStack, getTechStackDetail, getListTechStack, updateTechStack, deleteTechStack} = require("../controller/techStackController")
const router = express.Router();
router.post('/stacks/',verifitoken,createNewStack);
router.get('/stacks/:id',verifitoken,getTechStackDetail);
router.get('/stacks/',verifitoken,getListTechStack);
router.put('/stacks/:id',verifitoken,updateTechStack);
router.delete('/stacks/:id',verifitoken,deleteTechStack)
module.exports = router

