const joi = require("joi");
const registerIncome = joi.object({
    spendingMoney: joi.number().required(),
    description: joi.string().required(),
})

module.exports = registerIncome