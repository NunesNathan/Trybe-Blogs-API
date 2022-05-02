module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('User', {
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  }, {
    modelName: 'Users',
  });
  return users;
};
