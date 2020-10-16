const express = require("express")
const {verifitoken} = require("../middelware/verifytoken")
const router = express.Router();
const {createNewProjectType, getProjectTypeProfile, updateProjectType} = require("../controller/projectTypecontroller")

router.post('/types/',verifitoken,createNewProjectType);

router.get('/types/:id',verifitoken,getProjectTypeProfile);

router.put('/types/:id',verifitoken,updateProjectType);

// router.delete('/types/:id',verifitoken,)

module.exports = router

