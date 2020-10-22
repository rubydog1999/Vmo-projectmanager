const Department = require ('../../model/departermentModel')
const techStack = require('../../model/techStackModel')

const createNewDepartment = async (req,res) =>{
    try{
    const departement = await Department.findOne( {name: req.body.name})
    if (departement){
        return res.status(400).send({
            status:400,
            message : "Department is existed",
            code:"DEPARTERMENT_EXISIED"
        })
    }
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
    {
            const newDepartment = new Department(req.body)
            await newDepartment.save()
            res.status(200).send({
                status: 200,
                message: "Create new departement success",
                code: "CREATE_NEW_DEPARTEMENT_SUCCESS"
            })
        }
    }
    catch(err){
        res.status(400).send({
            status: 400,
            message: `${err}`
        })
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
                    select: ['fullName','address','phoneNumber','idNumber','DoB','certification','language']
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
        res.status(400).send({
            status: 400,
            message: `${err}`
        })
    }
}
module.exports.createNewDepartment = createNewDepartment
module.exports.getDepartment  = getDepartment