module.exports = (sequelize, DataTypes) => {
  const postsCategories = sequelize.define('PostsCategory', {
    postId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
  }, {
    modelName: 'PostsCategories',
  });
  return postsCategories;
};
