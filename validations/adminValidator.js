const Joi = require('joi')

const adminValidations = Joi.object({
    adminName: Joi.string().required().min(3),

    phoneNo: Joi.number().required().min(1000000000).max(9999999999),

    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).lowercase().required(),

    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),

    cpassword: Joi.ref('password')
})

module.exports = { adminValidations }