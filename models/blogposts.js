module.exports = (sequelize, DataTypes) => {
  const BlogPosts = sequelize.define('Post', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  }, {
    modelName: 'BlogPosts',
  });
  return BlogPosts;
};
