const Joi = require("joi");
// const mongoose = require("mongoose");

// const schema = Joi.object({
//   name: Joi.string()
//     .alphanum()
//     .min(3)
//     .max(30)
//     .required(),
//   email: Joi.string()

//     .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
//     .required(),
//   phone: Joi.number()
//     .min(5)
//     .max(9)
//     .required()
// });
// module.exports = schema;
module.exports = {
  addContactValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
      email: Joi.string()
        .min(3)
        .required()
        .email(),
      phone: Joi.string()
        .length(10)
        .pattern(/^[0-9]+$/)
        .required()
    });
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({ status: validationResult.error.details });
    }
    next();
  },
  putContactValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
      email: Joi.string()
        .min(3)
        .required()
        .email(),
      phone: Joi.string()
        .length(10)
        .pattern(/^[0-9]+$/)
        .required()
    });
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({ status: validationResult.error.details });
    }
    next();
  }
};

// const validationResult = schema.validate(req.body);
