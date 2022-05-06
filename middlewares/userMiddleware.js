const Joi = require('joi');

const userCreateSchema = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().min(8).required(),
  password: Joi.string().length(6).required(),
  image: Joi.string().required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().min(8).required(),
  password: Joi.string().length(6).required(),
});

const userParamsVerification = async (req, _res, next) => {
  const { error: somethingWrong } = userCreateSchema.validate(req.body);

  if (somethingWrong) {
    req.failVerification = {
      statusCode: 400,
      message: somethingWrong.details[0].message,
    };
  }

  next();
};

const loginParamsVerification = async (req, _res, next) => {
  const { error: somethingWrong } = loginSchema.validate(req.body);

  if (somethingWrong) {
    req.failVerification = {
      statusCode: 400,
      message: somethingWrong.details[0].message,
    };
  }

  next();
};

module.exports = {
  userParamsVerification,
  loginParamsVerification,
};
