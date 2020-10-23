const Joi = require  ('joi');
const { ProjectStatusValidationCreate, ProjectStatusValidationUpdate } = require('./projectStatusValidation');
//npm install @hapi/joi
//Register validation
const ProjectTypeValidationCreate = data =>{
const schema=Joi.object({  
    name : Joi.string().required(),
    description : Joi.string().required(),
    priority:Joi.string().required(),
    status : Joi.string()
});
    return schema.validate(data);
};
const ProjectTypeValidationUpdate = data =>{
    const schema=Joi.object({  
        name : Joi.string(),
        description : Joi.string(),
        priority:Joi.string(),
        status : Joi.string()
    });
        return schema.validate(data);
    };
module.exports.ProjectTypeValidationCreate = ProjectTypeValidationCreate,
module.exports.ProjectTypeValidationUpdate = ProjectTypeValidationUpdate