const express = require("express");
const { createNewProjectStatus, getProjectStatuskDetail, getListProjectStatus, updateProjectStatus, deleteProjectStatus } = require("../controller/projectStatusController");
const {verifitoken} = require("../middelware/verifytoken")

const router = express.Router();
router.post('/status/',verifitoken,createNewProjectStatus);
router.get('/status/:id',verifitoken,getProjectStatuskDetail);
router.get('/status/',verifitoken,getListProjectStatus);
router.put('/status/:id',verifitoken,updateProjectStatus);
router.delete('/status/:id',verifitoken,deleteProjectStatus)
module.exports = router

