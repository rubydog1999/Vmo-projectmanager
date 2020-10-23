const Joi = require  ('joi')
//npm install @hapi/joi
//Register validation
const ProjectStatusValidationCreate = data =>{
const schema=Joi.object({  
    name : Joi.string().required(),
    description : Joi.string().required(),
    status : Joi.string()
});
    return schema.validate(data);
};
const ProjectStatusValidationUpdate = data =>{
    const schema=Joi.object({  
        name : Joi.string(),
        description : Joi.string(),
        status : Joi.string()
    });
        return schema.validate(data);
    };
module.exports.ProjectStatusValidationCreate = ProjectStatusValidationCreate
module.exports.ProjectStatusValidationUpdate = ProjectStatusValidationUpdate