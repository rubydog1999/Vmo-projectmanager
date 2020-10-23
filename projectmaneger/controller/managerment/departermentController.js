const errorResponse = require('../../helper/error')
const Department = require('../../model/departermentModel')
const techStack = require('../../model/techStackModel')
const { DepartmentValidationCreate } = require('../../validation/departmentValidation')

const createNewDepartment = async (req, res) => {
    try {
        const { error } = DepartmentValidationCreate(req.body)
        if (error) res.status(400).send({
            status: 400,
            error: error.details[0].message
        })
        else {
            const departement = await Department.findOne({ name: req.body.name })
            if (departement) {
                return res.status(400).send({
                    status: 400,
                    message: "Department is existed",
                    code: "DEPARTERMENT_EXISIED"
                })
            }
            {
                const newDepartment = new Department(req.body)
                await newDepartment.save()
                res.status(200).send({
                    status: 200,
                    message: "Create new departement success",
                    code: "CREATE_NEW_DEPARTEMENT_SUCCESS",
                    data: newDepartment.id
                })
            }
        }
    }
    catch (err) {
        return errorResponse
    }
}
const getDepartment = async (req, res) => {
    try {
        let findDepartment = await Department.findOne({ _id: req.params.id }).
            populate({
                path: 'techStackList',
                populate: {
                    path: 'techStack',
                    select: ['name']
                },

            }).populate({
                path: 'employeeList',
                populate: {
                    path: 'employee',
                    select: ['fullName']
                },
            }).populate({
                path: 'projectList',
                populate: {
                    path: 'project',
                    select: ['name']
                },
            })
            ;
        if (findDepartment) {
            res.status(200).send({
                status: 200,
                data: findDepartment
            })
        }

    }
    catch (err) {
        return errorResponse
    }
}
module.exports.createNewDepartment = createNewDepartment
module.exports.getDepartment = getDepartment