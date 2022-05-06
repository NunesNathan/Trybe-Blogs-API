require('dotenv').config();
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');
const { userParamsVerification, loginParamsVerification,
  authenticationToken,
} = require('../middlewares/userMiddleware');
const userService = require('../services/userService');

const createUser = async (req, res) => {
  if (req.failVerification) {
    const { statusCode, message } = req.failVerification;

    return res.status(statusCode).json({ message });
  }

  const user = await userService.createUser(req.body);

  if (user.message) return res.status(409).json({ message: user.message });

  const token = jwt.sign({ user }, process.env.JWT_SECRET, jwtConfig);

  return res.status(201).json({ token });
};

const userLogin = async (req, res) => {
  if (req.failVerification) {
    const { statusCode, message } = req.failVerification;

    return res.status(statusCode).json({ message });
  }

  const exists = await userService.userLogin(req.body);

  if (exists.errorMessage) return res.status(400).json({ message: exists.errorMessage });

  return res.status(200).json({ token: exists.token });
};

const listUsers = async (req, res) => {
  if (req.failAuthentication) {
    const { statusCode, message } = req.failAuthentication;

    return res.status(statusCode).json({ message });
  }

  const list = await userService.listUsers();

  return res.status(200).json(list);
};

module.exports = {
  newUser: [
    userParamsVerification,
    createUser,
  ],
  attemptToLogin: [
    loginParamsVerification,
    userLogin,
  ],
  listUsers: [
    authenticationToken,
    listUsers,
  ],
};
