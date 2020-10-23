const Joi = require  ('joi')
//npm install @hapi/joi
//Register validation
Joi.objectId = require('joi-objectid')(Joi)
const ProjectValiadionCreate = data =>{
const schema=Joi.object({  
    name : Joi.string().required(),
    techStackList : Joi.array().required().items({
        techStack: Joi.objectId().required()}),
    description : Joi.string().required(),
    projectType:  Joi.objectId().required(),
    employeeList: Joi.array().required().items({
        employee : Joi.objectId().required()
    }),
    projectStatus: Joi.objectId().required(),
    status : Joi.string(),
    departmentList: Joi.array().required().items({
        department: Joi.objectId().required()
    })
});
    return schema.validate(data);
};
const ProjectValiadionUpdate = data =>{
    const schema=Joi.object({  
        name : Joi.string(),
        techStackList : Joi.array().items({
            techStack: Joi.objectId()}),
        description : Joi.string(),
        projectType:  Joi.objectId(),
        employeeList: Joi.array().items({
            employee : Joi.objectId()
        }),
        projectStatus: Joi.objectId(),
        status : Joi.string(),
        departmentList: Joi.array().items({
            department: Joi.objectId()
        })
    });
        return schema.validate(data);
    };
module.exports.ProjectValiadionCreate = ProjectValiadionCreate
module.exports.ProjectValiadionUpdate = ProjectValiadionUpdate