const Joi = require('joi')
//npm install @hapi/joi
//Register validation
const DepartmentValidationCreate = data => {
    const schema = Joi.object({
        name: Joi.string().required(),
        functionality: Joi.string().required(),
        projectList: Joi.array().required().items({
            project: Joi.objectId().required(),
        }),
        employeeList: Joi.array().required().items({
            employee: Joi.objectId().required()
        }),
        techStackList: Joi.array().required().items({
            techStack: Joi.objectId().required(),
        })
    });
    return schema.validate(data);
};
// const DepatmentUpdate = data => {
//     const schema = Joi.object({
//         name: Joi.string().required(),
//         functionality: Joi.date().required(),
//         projectList: Joi.array().required().items({
//             project: Joi.objectId().required(),
//         }),
//         employeeList: Joi.array().required().items({
//             employee: Joi.objectId.required()
//         }),
//         certification: Joi.array().required(),
//         techStackList: Joi.array().required().items({
//             techStack: Joi.objectId().required(),
//         })
//     });
//     return schema.validate(data);
// };
module.exports.DepartmentValidationCreate = DepartmentValidationCreate
// module.exports.EmployeeValidationUpdate = EmployeeValidationUpdate