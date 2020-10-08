const ProjectType = require('../model/projectTypeModel');
const createNewProjectType = async (req, res) => {
    try {
        const projectTypeExit = await ProjectType.findOne({ name: req.name });
        if (projectTypeExit) return res.status(400).send('Project is already exist')
        //create data
        const newProjectType = await ProjectType.create({
            name: req.body.name,
            description: req.body.description,
            priority: req.body.priority,
            status: req.body.status
        });
        if (newProjectType) return res.status(200).send('Project created success')
    } catch (err) {
        res.status(400).send(err);
    }
};


const getProjectTypeProfile = async (req, res) => {
    try {
        const projectType = await ProjectType.findOne({ _id: req.params.id });
        if (!projectType) return res.status(404).send("project is not found")
        res.send(projectType);
    } catch (err) {
        res.status(400).send(err);
    }
};
module.exports.getProjectTypeProfile = getProjectTypeProfile

const updateProjectType = async (req, res) => {
    try {
        console.log(" req.params.id,", req.params.id)
        const ProjectTypeUpdate = await ProjectType.updateOne({ id: req.params.id })
        res.send(
            {
                message: "Update access",
                record: ProjectTypeUpdate
            })
        return;
    }
    catch (err) {
        console.log(err)
    }
};
module.exports.getProjectTypeProfile = getProjectTypeProfile
module.exports.createNewProjectType = createNewProjectType
module.exports.updateProjectType = updateProjectType
// export const deleteProjectType = async (id) => {
//   try {
//     const projectType = await ProjectType.findOne({ _id: id });
//     if (!projectType){
//       return {
//         status: 404,
//         code: 'PRODUCT_TYPE_NOT_FOUND',
//         error: true,
//       };

//     }

//     await projectType.updateOne({ status: 'deleted' });

//     return {
//       status: 200,
//       code: 'DELETE_PROJECT_TYPE_SUCCESS',
//       error: false,
//     };
//   }catch( err ){
//     logger(`deleteProjectType ${err}`);

//     return errorResponse;
//   }
// };

// export const getListProjectTypes = async (search = '', page = 1, limit = 10, sortBy = 'name', sortOrder = 1) => {
//   try {
//     if ( search !== '' && (typeof search !== 'string') ){
//       search = search.toString().trim();
//     }

//     if ( Number.isInteger(parseInt(page)) && parseInt(page) > 0 ){
//       page = parseInt(page);
//     } else {
//       page = 1;
//     }

//     if ( Number.isInteger(parseInt(limit)) && parseInt(limit) > 0 ){
//       limit = parseInt(limit);
//     } else {
//       limit = 10;
//     }

//     if ( ['asce', 'ASCE', 'Asce', '1'].includes(sortOrder)) {
//       sortOrder = 1;
//     }

//     if (['desc', 'DESC', 'Desc', '-1'].includes(sortOrder)) {
//       sortOrder = -1;
//     }

//     sortBy = sortBy.toString().trim();
//     if ( ! ['name', 'status'].includes(sortBy) ){
//       sortBy = 'name';
//     }

//     const skipRecord = (page - 1) * limit;
//     let regex = `(${search})+`;

//     const totalRecords = await ProjectType.countDocuments({ 'name': new RegExp(regex, 'gmi') });
//     const projectTypes = await ProjectType.find({ 'name': new RegExp(regex, 'gmi') }, '_id name priority description status')
//       .sort( [[`${sortBy}`, sortOrder]])
//       .skip(skipRecord)
//       .limit(limit);

//     const totalPage = Math.ceil(totalRecords/limit);

//     return {
//       status: 200,
//       code: 'GET_LIST_PRODUCT_TYPES_SUCCESS',
//       error: false,
//       message: `Page: ${page}/${totalPage}`,
//       data: projectTypes,
//     };
//   }catch (err){
//     logger(`getListProjectTypes ${err}`);

//     return errorResponse;
//   }
// };