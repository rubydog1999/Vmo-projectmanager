// const Departement = require ('../../model/departermentModel')
const techStack = require('../../model/techStackModel')
const Employee = require('../../model/employeeModel')
const { get } = require('mongoose')

const createNewEmployee = async (req,res) =>{
    try{
    const employee = await Employee.findOne( {idNumber: req.body.idNumber})
    if (employee){
        return res.status(400).send({
            status:400,
            message : "employee already exist need to change IDs number",
            code:"EMPLOYEE_EXISIED"
        })
    }
    {
    const newEmployees = new Employee(req.body)
    await newEmployees.save()
    res.status(200).send({
        status:200,
        message: "Create new employee success",
        code: "CREATE_NEW_EMPLOYEE_SUCCESS"
            })
        }
    }
    catch(err){
        res.status(400).send({
            status:400,
            message : `${err}`
        })

    }
}
const getEmployeee = async (req,res) =>{
    try{
        const findEmployee = await Employee.findOne({_id:req.params.id}).populate('techStackID')
        if(findEmployee){
            res.status(200).send({
                status:200,
                data: findEmployee
            })
            }
        }
    catch(err){
        res.status(400).send({
            status:400,
            message : `${err}`
        })
    }
}
module.exports.createNewEmployee = createNewEmployee;
module.exports.getEmployeee = getEmployeee;