module.exports = (sequelize, DataTypes) => {
  const categories = sequelize.define('Category', {
    name: DataTypes.STRING,
  }, {
    modelName: 'Categories',
  });
  return categories;
};
