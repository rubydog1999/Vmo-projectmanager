const errorResponse = require('../helper/error');
const ProjectStatus = require('../model/projectStatusModel');
const { ProjectStatusValidationCreate, ProjectStatusValidationUpdate } = require('../validation/projectStatusValidation');
const createNewProjectStatus = async (req, res) => {
    try {
        const { error } = ProjectStatusValidationCreate(req.body)
        if (error) res.status(400).send({
            status:400,
            error: error.details[0].message
        })
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
        const { error } = ProjectStatusValidationUpdate(req.body)
        if (error) res.status(400).send({
            status:400,
            error: error.details[0].message
        })
        const findProjectStatus = await ProjectStatus.findById({_id:req.params.id})
        if (!findProjectStatus)
        res.status(404).send(
            {
                status: 404,
                message: "Project Status not found",
                code: "PROJECT_STATUS_NOT_FOUND"
            })
        
        const getProjectStatus = await ProjectStatus.updateOne({ _id: req.params.id },           
            {
                $set: {
                    name: req.body.name,
                    description: req.body.description,
                    status: req.body.status
                }
            },
        );
        if(getProjectStatus)
        res.status(200).send(
            {
                status: 200,
                message: "Update access",
                data: getProjectStatus
            })
        }
    catch (err) {
        return errorResponse
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
        return errorResponse
    }
};

module.exports.createNewProjectStatus = createNewProjectStatus
module.exports.getProjectStatuskDetail = getNewProjectStatus
module.exports.getListProjectStatus = getListProjectStatus
module.exports.updateProjectStatus = updateProjectStatus
module.exports.deleteProjectStatus = deleteProjectStatus