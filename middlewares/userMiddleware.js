require('dotenv').config();
const Joi = require('joi');
const jwt = require('jsonwebtoken');

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

const authenticationToken = async (req, _res, next) => {
  const { authorization: token } = req.headers;
  if (!token) {
    req.failAuthentication = {
      statusCode: 401,
      message: 'Token not found',
    };
  } else {
    jwt.verify(token, process.env.JWT_SECRET,
      async (err, _decode) => {
        if (err) {
          req.failAuthentication = {
            statusCode: 401,
            message: 'Expired or invalid token',
          };
        }
    });
  }

  next();
};

module.exports = {
  userParamsVerification,
  loginParamsVerification,
  authenticationToken,
};
