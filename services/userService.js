require('dotenv').config();
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');
const { User: userModel } = require('../models');

const createUser = async (user) => {
  const alreadyExists = await userModel.findOne({ where: { email: user.email } });

  if (alreadyExists) return ({ message: 'User already registered' });
  
  const userCreated = await userModel.create(user);

  return userCreated;
};

const userLogin = async (user) => {
  const exists = await userModel.findOne({ where: { email: user.email, password: user.password } });

  if (!exists) return ({ errorMessage: 'Invalid fields' });

  const token = jwt.sign({ user: exists }, process.env.JWT_SECRET, jwtConfig);

  return ({ token });
};

const listUsers = async () => {
  const list = await userModel.findAll();

  return list;
};

const findUser = async (id) => {
  const user = await userModel.findByPk(id);

  if (!user) return ({ errorMessage: 'User does not exist' });

  return user;
};

module.exports = {
  createUser,
  userLogin,
  listUsers,
  findUser,
};
