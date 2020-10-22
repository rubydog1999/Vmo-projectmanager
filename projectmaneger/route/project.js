const express = require("express");
const { createNewProject, getNewProjects } = require("../controller/managerment/projectController");


const {verifitoken} = require("../middelware/verifytoken")

const router = express.Router();
router.post('/project/',verifitoken,createNewProject);
router.get('/project/:id',verifitoken,getNewProjects);

module.exports = router

