const joi = require("joi");

const registerIncome = joi.object({
    incomeMoney: joi.number().required(),
    description: joi.string().required(),
})

module.exports = registerIncome