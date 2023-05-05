const Joi = require('joi');

const infoLoginSchema = Joi.object({
  email: Joi.string().email().required().label('email'),
  password: Joi.string().min(6).required().label('password'),
});

const infoRegisterSchema = Joi.object({
  name: Joi.string().min(12).required().label('name'),
  email: Joi.string().email().required().label('email'),
  password: Joi.string().min(6).required().label('password'),
});

module.exports = {
  infoLoginSchema,
  infoRegisterSchema,
};
