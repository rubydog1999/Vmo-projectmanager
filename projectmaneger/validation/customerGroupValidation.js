const Joi = require  ('joi')
//npm install @hapi/joi
//Register validation
const CustomerGroupValidationCreate = data =>{
const schema=Joi.object({  
    name : Joi.string().required(),
    description : Joi.string().required(),
    priority:Joi.string().required(),
    status : Joi.string()
});
    return schema.validate(data);
};
const CustomerGroupValidationUpdate = data =>{
    const schema=Joi.object({  
        name : Joi.string(),
        description : Joi.string(),
        priority:Joi.string(),
        status : Joi.string()
    });
        return schema.validate(data);
    };
module.exports.CustomerGroupValidationCreate = CustomerGroupValidationCreate
module.exports.CustomerGroupValidationUpdate = CustomerGroupValidationUpdate