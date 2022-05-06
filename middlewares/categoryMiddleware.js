const Joi = require('joi');

const categorySchema = Joi.object({
  name: Joi.string().min(3).required(),
});

const categoryParamsVerification = async (req, _res, next) => {
  const { error: somethingWrong } = categorySchema.validate(req.body);

  if (somethingWrong) {
    req.failAuthentication = {
      statusCode: 400,
      message: somethingWrong.details[0].message,
    };
  }

  next();
};

module.exports = {
  categoryParamsVerification,
};