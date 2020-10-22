const ProjectStatus = require('../model/projectStatus')
const createNewProjectStatus = async (req, res) => {
    try {
        const ProjectStatusExit = await ProjectStatus.findOne({ name: req.body.name });
        if (ProjectStatusExit) return res.status(404).send({
            status: 404,
            code: 'PROJECT_STATUS_EXIT',
            error: true,
        })
        //create data
        const newProjectStatus = await ProjectStatus.create({
            name: req.body.name,
            description: req.body.description,
            status: req.body.status
        });
        if (newProjectStatus) return res.status(200).send({
            status: 200,
            code: 'CREATE_NEW_PROJECT_STATUS_SUCCESS',
            error: false,
            data: newProjectStatus._id,
        })
    } catch (err) {
        res.status(400).send(err);
    }
};


const getNewProjectStatus = async (req, res) => {
    try {
        const TechStack = await ProjectStatus.findOne({ _id: req.params.id });
        if (!TechStack) return res.status(404).send({
            status: 404,
            message: 'PROJECT_STATUS_IS_NOT_FOUND'
        })
        res.send(TechStack);
    } catch (err) {
        res.status(400).send(err);
    }
};
const getListProjectStatus = async (req, res) => {
    try {
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)
        const startIndex = (page - 1) * limit
        const endIndex = page * limit
        const result = await ProjectStatus.find().skip(startIndex).limit(endIndex)
        res.send(result)
    }
    catch (err) {
        res.status(400).send(err);
    }
}

const updateProjectStatus = async (req, res) => {
    try {
        const getProjectStatus = await ProjectStatus.updateOne({ _id: req.params.id },
            {
                $set: {
                    name: req.body.name,
                    description: req.body.description,
                    status: req.body.status
                }
            },
        );
        res.status(200).send(
            {
                status: 200,
                message: "Update access",
                data: getProjectStatus
            })
        return;
    }
    catch (err) {
        res.status(400).send(err);
    }
}
const deleteProjectStatus = async (req, res) => {
    try {
        const ProjectStatusDelete = await ProjectStatus.findOne({ _id: req.params.id });
        if (!ProjectStatusDelete) {
            res.status(404).send({
                status: 404,
                code: 'PROJECT_STATUS_IS_NOT_FOUND',
                error: true,
            });
        }
        await ProjectStatus.remove({ _id: req.params.id })
        res.status(200).send({
            status: 200,
            code: 'PROJECT_STATUS_DELETE_SUCCESS',
            error: false,
        });
    } catch (err) {
        res.status(400).send(err);
    }
};

module.exports.createNewProjectStatus = createNewProjectStatus
module.exports.getProjectStatuskDetail = getNewProjectStatus
module.exports.getListProjectStatus = getListProjectStatus
module.exports.updateProjectStatus = updateProjectStatus
module.exports.deleteProjectStatus = deleteProjectStatus