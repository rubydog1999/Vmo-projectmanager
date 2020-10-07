const Joi = require  ('joi')
//npm install @hapi/joi
//Register validation
const RegisterValidation = data =>{
const schema=Joi.object({  
    userName : Joi.string().min(2).required(),
    password : Joi.string().required()
});
    return schema.validate(data);
};
const LoginValidation = data =>{
const schema=Joi.object({  
        userName : Joi.string().required(),
        password : Joi.string().required()
    });
        return schema.validate(data);
    };
module.exports.RegisterValidation = RegisterValidation
module.exports.LoginValidation = LoginValidation