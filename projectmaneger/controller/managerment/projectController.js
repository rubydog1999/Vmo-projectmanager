// const Departement = require ('../../model/departermentModel')
const techStack = require('../../model/techStackModel')
const Employee = require('../../model/employeeModel')
const ProjectType = require('../../model/projectTypeModel')
const ProjectStatus =require('../../model/projectStatus')
const Project = require('../../model/projectModel')

const createNewProject = async (req, res) => {
    try {
        const findProject = await Project.findOne({ name: req.body.name })
        if (findProject) {
            return res.status(400).send({
                status: 400,
                message: "project already exist",
                code: "PROJECT_EXISIED"
            })
        }
        {
            const newProject = new Project(req.body)
            await newProject.save()
            res.status(200).send({
                status: 200,
                message: "Create new project success",
                code: "CREATE_NEW_PROJECT_SUCCESS"
            })
        }
    }
    catch (err) {
        res.status(400).send({
            status: 400,
            message: `${err}`
        })

    }
}
const getNewProject = async (req, res) => {
    try {
        const findProject = await Project.findOne({ _id: req.params.id }).
            populate({
                path: 'techStackList',
                populate: {
                    path: 'techStack',
                    select: ['name']
                },

            }).populate({path:'projectType',select:['name','description','priority']
            }).populate({path:'projectStatus',select:['name']})
            .populate({
                path: 'employeeList',
                populate: {
                    path: 'employee',
                    select: ['fullName']
                },
            })
           ;
      
        if (findProject) {
            res.status(200).send({
                status: 200,
                data: findProject
            })
        }
    }
    catch (err) {
        res.status(400).send({
            status: 400,
            message: `${err}`
        })
    }
}
module.exports.createNewProject = createNewProject;
module.exports.getNewProjects = getNewProject;