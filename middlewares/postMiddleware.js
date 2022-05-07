const Joi = require('joi');

const postSchema = Joi.object({
  title: Joi.string().min(3).required(),
  content: Joi.string().min(3).required(),
  categoryIds: Joi.array().items(Joi.number().required()).required(),
});

const postParamsVerification = async (req, _res, next) => {
  const { error: somethingWrong } = postSchema.validate(req.body);

  if (somethingWrong) {
    req.failAuthentication = {
      statusCode: 400,
      message: somethingWrong.details[0].message,
    };
  }

  next();
};

module.exports = {
  postParamsVerification,
};
