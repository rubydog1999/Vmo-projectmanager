// const Departement = require ('../../model/departermentModel')
const techStack = require('../../model/techStackModel')
const Employee = require('../../model/employeeModel')
const { updateCustomerGroup } = require('../customerGroupController')

const createNewEmployee = async (req, res) => {
    try {

        const employee = await Employee.findOne({ idNumber: req.body.idNumber })
        if (employee) {
            return res.status(400).send({
                status: 400,
                message: "employee already exist need to change IDs number",
                code: "EMPLOYEE_EXISIED"
            })
        }
        {
            const newEmployees = new Employee(req.body)
            await newEmployees.save()
            res.status(200).send({
                status: 200,
                message: "Create new employee success",
                code: "CREATE_NEW_EMPLOYEE_SUCCESS"
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
        res.status(400).send({
            status: 400,
            message: `${err}`
        })
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

            });
        return res.status(200).send({
            status: 200,
            result
        })
    }
    catch (err) {
        res.status(400).send({
            status: 400,
            message: `${err}`
        })
    }
}
const updateEmployee = async (req, res) => {
    try {
        const findEmployeeUpdate = await Employee.findByIdAndUpdate(req.params.id, req.body)
        if (findEmployeeUpdate)
            res.status(200).send(
                {
                    status: 200,
                    message: "Update access",
                    data: findEmployeeUpdate
                })
        return;
    }
    catch (err) {
        res.status(400).send(err);
    }
}
module.exports.createNewEmployee = createNewEmployee;
module.exports.getEmployeee = getEmployeee;
module.exports.getEmployeeeList = getEmployeeeList;
module.exports.updateEmployee = updateEmployee;