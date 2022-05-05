const Joi = require('joi');

const userParamsVerification = async (req, _res, next) => {
  const { error: somethingWrong } = Joi.object({
    displayName: Joi.string().min(8).required(),
    email: Joi.string().email().min(8).required(),
    password: Joi.string().length(6).required(),
    image: Joi.string().required(),
  }).validate(req.body);

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
};
