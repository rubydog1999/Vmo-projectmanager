const Joi = require('joi')
//npm install @hapi/joi
//Register validation
const EmployeeValidationCreate = data => {
    const schema = Joi.object({
        fullName: Joi.string().required(),
        DoB: Joi.date().required(),
        idNumber: Joi.string().required(),
        phoneNumber: Joi.string().required(),
        address: Joi.string().required(),
        language: Joi.array().required(),
        certification: Joi.array().required(),
        techStackList: Joi.array().required().items({
            techStack: Joi.objectId().required(),
            exp: Joi.string().required(),
            description: Joi.string().required()
        }),
        
    });
    return schema.validate(data);
};
const EmployeeValidationUpdate = data => {
    const schema = Joi.object({
        fullName: Joi.string(),
        DoB: Joi.date(),
        idNumber: Joi.string(),
        phoneNumber: Joi.string(),
        address: Joi.string(),
        language: Joi.array(),
        certification: Joi.array(),
        techStackList: Joi.array().items({
            techStack: Joi.objectId(),
            exp: Joi.string(),
            description: Joi.string()
        }),
    });
    return schema.validate(data);
};
module.exports.EmployeeValidationCreate = EmployeeValidationCreate
module.exports.EmployeeValidationUpdate = EmployeeValidationUpdate