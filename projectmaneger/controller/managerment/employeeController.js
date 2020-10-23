// const Departement = require ('../../model/departermentModel')
const techStack = require('../../model/techStackModel')
const Employee = require('../../model/employeeModel')
const errorResponse = require('../../helper/error');
const { update } = require('../../model/techStackModel');
const { EmployeeValidationCreate, EmployeeValidationUpdate } = require('../../validation/employeeValidation');

const createNewEmployee = async (req, res) => {
    try {
        const { error } = EmployeeValidationCreate(req.body)
        if (error) res.status(400).send({
            status: 400,
            error: error.details[0].message
        })
        else {
            const employee = await Employee.findOne({ idNumber: req.body.idNumber })
            if (employee) {
                return res.status(400).send({
                    status: 400,
                    message: "employee already exist need to change IDs number",
                    code: "EMPLOYEE_EXISIED"
                })
            }
            else{
            {
                const newEmployees = new Employee(req.body)
                await newEmployees.save()
                res.status(200).send({
                    status: 200,
                    message: "Create new employee success",
                    code: "CREATE_NEW_EMPLOYEE_SUCCESS",
                    data : "newEmployees"
                })
            }
        }
        }
    }
    catch (err) {
        return errorResponse

    }
}
const getEmployeee = async (req, res) => {
    try {
        const findEmployee = await Employee.findOne({ _id: req.params.id }).
            populate({
                path: 'techStackList',
                populate: {
                    path: 'techStack',
                    select: ['name']
                },

            });
        if (findEmployee) {
            res.status(200).send({
                status: 200,
                data: findEmployee
            })
        }
    }
    catch (err) {
        return errorResponse
    }
}
const getEmployeeeList = async (req, res) => {
    try {
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)
        const startIndex = (page - 1) * limit
        const endIndex = page * limit
        const result = await Employee.find().skip(startIndex).limit(endIndex).
            populate({
                path: 'techStackList',
                populate: {
                    path: 'techStack',
                    select: ['name']
                },
            }). populate({
                path: 'projectList',
                populate: {
                    path: 'project',
                    select: ['name']
                },
            })
        return res.status(200).send({
            status: 200,
            result
        })
    }
    catch (err) {
        return errorResponse
    }
}
const updateEmployee = async (req, res) => {
    try {
        const { error } = EmployeeValidationUpdate(req.body)
        if (error) res.status(400).send({
            status: 400,
            error: error.details[0].message
        })
        else {
            const findEmployeeUpdate = await Employee.findById({ _id: req.params.id })
            if (!findEmployeeUpdate)
                res.status(404).send(
                    {
                        status: 404,
                        message: "Employee is not found",
                        code: "EMPLOYEE_NOT_FOUND"
                    })
            const getEmployeeUpdate = await Employee.updateOne({ _id: req.params.id },
                {
                    $set: {
                        fullName: req.body.fullName,
                        DoB: req.body.DoB,
                        idNumber: req.body.idNumber,
                        phoneNumber: req.body.phoneNumber,
                        address: req.body.address,
                        techStackList: req.body.techStackList,
                        certification: req.body.certification,
                        language: req.body.language
                    }
                },
            );
            if (getEmployeeUpdate)
                res.status(200).send(
                    {
                        status: 200,
                        message: "Update access",
                        code: "UPDATE_ACCESS",
                        data: getEmployeeUpdate
                    })
        }
    }
    catch (err) {
        return errorResponse
    }
}
const deleteEmployee = async (req, res) => {
    try {
        const EmployeeDelete = await Employee.findOne({ _id: req.params.id });
        if (!EmployeeDelete) {
            res.status(404).send({
                status: 404,
                message: "employee not found",
                code: 'EMPLOYEE_NOT_FOUND',
            });
        }
        await EmployeeDelete.remove({ _id: req.params.id })
        res.status(200).send({
            status: 200,
            message: "employee delete success",
            code: 'EMPLOYEE_DELETE_SUCCESS',
        });
    } catch (err) {
        return errorResponse
    }
};
module.exports.createNewEmployee = createNewEmployee;
module.exports.getEmployeee = getEmployeee;
module.exports.getEmployeeeList = getEmployeeeList;
module.exports.updateEmployee = updateEmployee;
module.exports.deleteEmployee = deleteEmployee;