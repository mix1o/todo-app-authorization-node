const Joi = require('@hapi/joi');

const registerValidation = (data) => {
  const schema = Joi.object({
    Firstname: Joi.string().min(3).required(),
    Lastname: Joi.string().min(4).required(),
    Email: Joi.string().min(6).email().required(),
    Password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    Email: Joi.string().min(6).email().required(),
    Password: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};

const resetValidation = (data) => {
  const schema = Joi.object({
    Email: Joi.string().min(6).email().required(),
    NewPassword: Joi.string().min(6).required(),
    ConfirmNewPassword: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

const taskValidation = (data) => {
  const schema = Joi.object({
    Title: Joi.string().min(1).required(),
    Description: Joi.string().min(6).required(),
    Priority: Joi.string().required(),
  });
  return schema.validate(data);
};

const messageValidation = (data) => {
  const schema = Joi.object({
    Subject: Joi.string().min(3).required(),
    Email: Joi.string().email().min(6).required(),
    Message: Joi.string().required().min(5),
  });
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.resetValidation = resetValidation;
module.exports.taskValidation = taskValidation;
module.exports.messageValidation = messageValidation;
