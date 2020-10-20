const techStack = require('../model/techStackModel');
const { updateProjectType } = require('./projectTypecontroller');
const createNewStack = async (req, res) => {
    try {
        const techStackExit = await techStack.findOne({ name: req.body.name });
        if (techStackExit) return res.status(404).send({
            status: 404,
            code: 'TEACH_STACK_EXIST',
            error: true,
        })
        //create data
        const newtechStack = await techStack.create({
            name: req.body.name,
            description: req.body.description,
            status: req.body.status
        });
        if (newtechStack) return res.status(200).send({
            status: 200,
            code: 'CREATE_NEW_TECH_STACK_TYPE_SUCCESS',
            error: false,
            data: newtechStack._id,
        })
    } catch (err) {
        res.status(400).send(err);
    }
};


const getTechStackDetail = async (req, res) => {
    try {
        const TechStack = await techStack.findOne({ _id: req.params.id });
        if (!TechStack) return res.status(404).send({
            status: 404,
            message: 'PROJECT_TYPE_IS_NOT_FOUND'
        })
        res.send(TechStack);
    } catch (err) {
        res.status(400).send(err);  
    }
};
const  getListTechStack  =  async (req,res)=>{
    try{
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)
        const startIndex = (page - 1) * limit
        const endIndex = page * limit
        
        const result = {}

        if(endIndex<techStack.length)
        {
            result.next = {
                page: page+1,
                limit : limit
            }
        }
        if (startIndex>0){
            result.previous = {
                page : page-1,
                limit : limit
            } 
        }
        result.result = techStack.slice(startIndex, endIndex)
        res.send(result)     
    }
    catch (err){
        res.status(400).send(err);  
    }
}

const updateTechStack = async (req, res) => {
    try {
        const techStack = await techStack.updateOne({ _id: req.params.id },
            {
            $set:{
                name: req.body.name,
                description: req.body.description,
                status:req.body.status
            }
            },
        );
        res.status(200).send(
            {   
                status:200,
                message: "Update access",
                data: techStack
            })
        return;
    }
    catch (err) {
        res.status(400).send(err);
    }
}
// const deleteProjectType = async (req,res) => {
//     try {
//       const projectTypeDelete = await ProjectType.findOne({ _id: req.params.id });
//       if (!projectTypeDelete){
//         res.status(404).send({
//           status: 404,
//           code: 'PRODUCT_TYPE_NOT_FOUND',
//           error: true,
//         });
//       }
//     await ProjectType.remove({ _id: req.params.id })
//     res.status(200).send( {
//         status: 200,
//         code: 'DELETE_PROJECT_TYPE_SUCCESS',
//         error: false,
//       });
//     }catch( err ){
//         res.status(400).send(err);
//     }
//   };

// module.exports.getProjectTypeProfile = getProjectTypeProfile
module.exports.createNewStack = createNewStack
module.exports.getTechStackDetail = getTechStackDetail
module.exports.getListTechStack = getListTechStack  
module.exports.updateTechStack = updateTechStack
// module.exports.updateProjectType = updateProjectType
// module.exports.deleteProjectType = deleteProjectType