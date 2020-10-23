const express = require("express");
const { createNewProject, getNewProjects, updateProject, deleteProject } = require("../controller/managerment/projectController");


const {verifitoken} = require("../middelware/verifytoken")

const router = express.Router();
router.post('/project/',verifitoken,createNewProject);
router.get('/project/:id',verifitoken,getNewProjects);
router.put ('/project/:id',verifitoken,updateProject);
router.delete('/project/:id',verifitoken,deleteProject);
module.exports = router

