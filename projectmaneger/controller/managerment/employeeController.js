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
    for(let a=0 ; a<=req.body.techStackList.lenght; a++){
        const findTechStack = await techStack.findOne({_id:req.body.techStackList[a].techStack})
        if (!findTechStack){
            return res.status(400).send({
                status: 404,
                code: 'TECH_STACK_NOT_FOUND',
                error: true,
                message: `TechStack is not existed`,
            })
        }
    }
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
        const findEmployee = await Employee.findOne({_id:req.param.id})
        if(findEmployee){
            for(let a=0 ; a<=req.body.techStackList.lenght; a++){
            const newTechStack = req.body.techStackList[a].techStack
            const findTechStacks = await techStack.findById(newTechStack)
            if (findTechStacks){
                newTechStack  = findTechStacks
                res.status(200).send({
                    status:200,
                    data: findEmployee
                })
            }
            }
            

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