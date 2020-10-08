const express = require("express")
const {verifitoken} = require("../middelware/verifytoken")
const router = express.Router();
const {createNewProjectType} = require("../controller/projectTypecontroller")

router.post('/types/',verifitoken,createNewProjectType);

module.exports = router
