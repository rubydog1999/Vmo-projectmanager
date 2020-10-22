const ProjectType = require('../model/projectTypeModel');
const createNewProjectType = async (req, res) => {
    try {
        const projectTypeExit = await ProjectType.findOne({ name: req.body.name });
        if (projectTypeExit) return res.status(400).send({
            status: 400,
            code: 'PROJECT_TYPE_EXIST',
            error: true,

        })
        //create data
        const newProjectType = await ProjectType.create({
            name: req.body.name,
            description: req.body.description,
            priority: req.body.priority,
            status: req.body.status
        });
        if (newProjectType) return res.status(200).send({
            status: 200,
            code: 'CREATE_NEW_PROJECT_TYPE_SUCCESS',
            error: false,
            data: newProjectType._id,
        })
    } catch (err) {
        res.status(400).send(err);
    }
};
const getProjectTypeProfile = async (req, res) => {
    try {
        const checkID = await mongoose.Types.ObjectId.isValid(id)
        console.log(checkID)
        if (checkID = false)
            res.status(400).send({
                status: 400,
                message: 'INVALID ID'
            })
        const projectType = await ProjectType.findOne({ _id: req.params.id });
        if (!projectType) return res.status(404).send({
            status: 404,
            message: 'PROJECT_TYPE_IS_NOT_FOUND'
        })
        res.send(projectType);
    } catch (err) {
        res.status(400).send(err);
    }
};


const updateProjectType = async (req, res) => {
    try {
        const ProjectTypeUpdate = await ProjectType.updateOne({ _id: req.params.id },
            {
                $set: {
                    name: req.body.name, description: req.body.description, priority: req.body.priority, status: req.body.status
                }
            },
        );
        res.status(200).send(
            {
                status: 200,
                message: "Update access",
                data: ProjectTypeUpdate
            })
        return;
    }
    catch (err) {
        res.status(400).send(err);
    }
}
const deleteProjectType = async (req, res) => {
    try {
        const projectTypeDelete = await ProjectType.findOne({ _id: req.params.id });
        if (!projectTypeDelete) {
            res.status(404).send({
                status: 404,
                code: 'PRODUCT_TYPE_NOT_FOUND',
                error: true,
            });
        }
        await ProjectType.remove({ _id: req.params.id })
        res.status(200).send({
            status: 200,
            code: 'DELETE_PROJECT_TYPE_SUCCESS',
            error: false,
        });
    } catch (err) {
        res.status(400).send(err);
    }
};

module.exports.getProjectTypeProfile = getProjectTypeProfile
module.exports.createNewProjectType = createNewProjectType
module.exports.updateProjectType = updateProjectType
module.exports.deleteProjectType = deleteProjectType