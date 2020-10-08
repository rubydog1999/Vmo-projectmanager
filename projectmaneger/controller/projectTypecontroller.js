const  ProjectType  = require ('../model/projectTypeModel');
const createNewProjectType = async (req,res) => {
  try {
    const projectTypeExit = await ProjectType.findOne({ name: req.name });
    if (projectTypeExit) return res.status(400).send('Project is already exist')
    
    //create data
    const newProjectType = await ProjectType.create({
        name : req.name,
        description: req.description,
        priority: req.priority,
        status: req.status
    });
    if (newProjectType) return res.status(200).send('Project created success') 
  } catch (err) {
        res.status(400).send(err);
  }
};

module.exports.createNewProjectType = createNewProjectType

// const getProjectTypeDetail = async (req,res,id) => {
//   try {
//     const projectType = await ProjectType.findOne({ _id: id }, ['_id', 'name', 'description', 'priority', 'status']);
//     if (!projectType) return res.status(404).send("project is not found")
//     res.send(projectType);
//   }catch (err) {
//     logger(`getProjectTypeDetail ${err}`);

//     return errorResponse;
//   }
// };

// export const updateProjectType = async ( id, data ) => {
//   try {
//     const projectType = await ProjectType.findOne({ _id: id });
//     if (!projectType){
//       return {
//         status: 404,
//         code: 'PRODUCT_TYPE_NOT_FOUND',
//         error: true,
//       };
//     }
//     await projectType.updateOne(data);

//     return {
//       status: 200,
//       code: 'UPDATE_PROJECT_TYPE_SUCCESS',
//       error: false,
//       data: data,
//     };
//   }catch( err ) {
//     logger(`updateProjectType ${err}`);

//     return errorResponse;
//   }
// };

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