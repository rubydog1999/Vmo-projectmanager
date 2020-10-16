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


const updateProjectType = async (req, res) => {
    try {
        console.log(" req.params.id,", req.params.id)
        const ProjectTypeUpdate = await ProjectType.updateOne({ id: req.params.id },
            {
            $set:{
                name: req.body.name,description: req.body.description,priority: req.body.priority,status:req.body.status}
            },
        );
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
}
const deleteProjectType = async (req,res) => {
    try {
      const projectType = await ProjectType.findOne({ _id: id });
      if (!projectType){
        return {
          status: 404,
          code: 'PRODUCT_TYPE_NOT_FOUND',
          error: true,
        };
  
      }
  
      await projectType.updateOne({ status: 'deleted' });
  
      return {
        status: 200,
        code: 'DELETE_PROJECT_TYPE_SUCCESS',
        error: false,
      };
    }catch( err ){
      logger(`deleteProjectType ${err}`);
  
      return errorResponse;
    }
  };

module.exports.getProjectTypeProfile = getProjectTypeProfile
module.exports.createNewProjectType = createNewProjectType
module.exports.updateProjectType = updateProjectType