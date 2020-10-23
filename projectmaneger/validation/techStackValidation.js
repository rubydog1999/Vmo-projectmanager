const Joi = require  ('joi')
//npm install @hapi/joi
//Register validation
const TechStackVadilationCreate = data =>{
const schema=Joi.object({  
    name : Joi.string().required(),
    description : Joi.string().required(),
    status : Joi.string().required()
});
    return schema.validate(data);
};
const TechStackVadilationUpdate = data =>{
    const schema=Joi.object({  
        name : Joi.string().required(),
        description : Joi.string().required(),
        status : Joi.string().required()
    });
        return schema.validate(data);
    };
module.exports.TechStackVadilationCreate = TechStackVadilationCreate
module.exports.TechStackVadilationUpdate = TechStackVadilationUpdate