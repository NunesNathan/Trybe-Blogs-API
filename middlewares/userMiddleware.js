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

const authFailError = (msg) => ({
  statusCode: 401,
  message: msg,
});

const catcher = async (token, req) => {
  jwt.verify(token, process.env.JWT_SECRET,
    async (err, decode) => {
      if (err) {
        req.failAuthentication = authFailError('Expired or invalid token');
      } else {
        req.actualUser = decode.user;
      }
    });
};

const authenticationToken = async (req, _res, next) => {
  const { authorization: token } = req.headers;
  if (!token) {
    req.failAuthentication = authFailError('Token not found');
  } else {
    await catcher(token, req);
  }

  next();
};

module.exports = {
  userParamsVerification,
  loginParamsVerification,
  authenticationToken,
};
