// const Departement = require ('../../model/departermentModel')
const techStack = require('../../model/techStackModel')
const Employee = require('../../model/employeeModel')
const ProjectType = require('../../model/projectTypeModel')
const ProjectStatus = require('../../model/projectStatusModel')
const Project = require('../../model/projectModel')
const { ProjectValiadionCreate, ProjectValiadionUpdate } = require('../../validation/projectValidation')
const errorResponse = require('../../helper/error')

const createNewProject = async (req, res) => {
    try {
        const { error } = ProjectValiadionCreate(req.body)
        if (error) res.status(400).send({
            status: 400,
            error: error.details[0].message
        })
        else {
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
                    code: "CREATE_NEW_PROJECT_SUCCESS",
                    data: newProject.id
                })
            }
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

            }).populate({
                path: 'projectType', select: ['name', 'description', 'priority']
            }).populate({ path: 'projectStatus', select: ['name'] })
            .populate({
                path: 'employeeList',
                populate: {
                    path: 'employee',
                    select: ['fullName']
                },
            }).populate({
                path:'departmentList',
                populate:{
                    path :'department',
                    select: ['name']
                }
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
const updateProject = async (req, res) => {
    try {
        const { error } = ProjectValiadionUpdate(req.body)
        if (error) res.status(400).send({
            status: 400,
            error: error.details[0].message
        })
        else {
            const finndProjectUpdate = await Project.findById({ _id: req.params.id })
            if (!finndProjectUpdate)
                res.status(404).send(
                    {
                        status: 404,
                        message: "Employee is not found",
                        code: "EMPLOYEE_NOT_FOUND"
                    })
            const getProjectUpdate = await Project.updateOne({ _id: req.params.id },
                {
                    $set: {
                        name: req.body.name,
                        description: req.body.description,
                        techStackList: req.body.techStackList,
                        projectType: req.body.projectType,
                        projectStatus: req.body.projectStatus,
                        employeeList: req.body.employeeList,
                    }
                },
            );
            if (getProjectUpdate)
                res.status(200).send(
                    {
                        status: 200,
                        message: "Update access",
                        code: "UPDATE_ACCESS",
                        data: getProjectUpdate
                    })
        }
    }
    catch (err) {
        res.status(400).send(err);
    }
}
const deleteProject = async (req, res) => {
    try {
        const ProjectDelete = await Project.findOne({ _id: req.params.id });
        if (!ProjectDelete) {
            res.status(404).send({
                status: 404,
                message: "Project not found",
                code: 'PROJECT_NOT_FOUND',
            });
        }
        await ProjectDelete.remove({ _id: req.params.id })
        res.status(200).send({
            status: 200,
            message : "Project delete success",
            code: 'PROJECT_DELETE_SUCCESS',
        });
    } catch (err) {
        return errorResponse
    }
};
module.exports.createNewProject = createNewProject;
module.exports.getNewProjects = getNewProject;
module.exports.updateProject = updateProject;
module.exports.deleteProject = deleteProject;