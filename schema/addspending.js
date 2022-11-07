const joi = require("joi");
const registerspending = joi.object({
    spendingMoney: joi.number().required(),
    description: joi.string().required(),
})

module.exports = registerspending