const { User: userModel } = require('../models');

const createUser = async (user) => {
  const alreadyExists = await userModel.findOne({ where: { email: user.email } });

  if (alreadyExists) return ({ message: 'User already registered' });

  const userCreated = await userModel.create(user);

  return userCreated;
};

module.exports = {
  createUser,
};
