const Joi = require('joi')

const userValidations = Joi.object({
    user_name: Joi.string().required().min(3),

    phone_no: Joi.number().required().min(1000000000).max(9999999999),

    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),

    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),

    cpassword: Joi.ref('password')
})

module.exports = { userValidations }