const joi = require("joi");
const registerstracker = joi.object({
    money: joi.number().required(),

})

module.exports = registerstracker