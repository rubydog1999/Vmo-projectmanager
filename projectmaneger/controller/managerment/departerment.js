// const Departement = require ('../../model/departermentModel')
// const techStack = require('../../model/techStackModel')

// const createNewDepartement = async (req,res) =>{
//     try{
//     const departement = await Departement.findOne( {name: req.body.name})
//     if (departement){
//         return res.status(400).send({
//             status:400,
//             message : "Departement is existed",
//             code:"DEPARTERMENT_EXISIED"
//         })
//     }
//     for (let a of techStack){
//         const findTechStack = await techStack.findOne({_id:a.techStack,status:'active'})
//         if (!findTechStack){
//             return res.status(400).send({
//                 status: 404,
//                 code: 'TECH_STACK_NOT_FOUND',
//                 error: true,
//                 message: `TechStack with id data: ${e.techStack} is not existed`,
//                 data: e.techStack,
//             })
//         }
//     }
//     const newDepartemnet = await Departement.create({
//         name: req.body.name,
//         functionality: req.body.functionality,
//         techStackList : req.body.techStackList,
//         projectList: req.body.projectList,
//         status: req.body.status
//     });
//     }
//     catch(err){

//     }
// }