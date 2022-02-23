const Joi = require("joi");
// const mongoose = require("mongoose");

const schema = Joi.object({
  name: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  email: Joi.string()

    .email()
    .required(),
  phone: Joi.number()
    .min(5)
    .max(12)
    .required()
});
module.exports = schema;
// const validationResult = schema.validate(req.body);
