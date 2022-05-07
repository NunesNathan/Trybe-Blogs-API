const modelSchema = (DataTypes) => ({
  postId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'BlogPosts',
      key: 'id',
    },
  },
  categoryId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Categories',
      key: 'id',
    },
  },
});

const options = {
  modelName: 'PostsCategories',
  timestamps: false,
};

module.exports = (sequelize, DataTypes) => {
  const PostsCategory = sequelize.define('PostsCategory', modelSchema(DataTypes), options);

  PostsCategory.associate = (models) => {
    models.Post.belongsToMany(models.Category, {
      as: 'categories',
      through: PostsCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
    models.Category.belongsToMany(models.Post, {
      as: 'blogPosts',
      through: PostsCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  };

  return PostsCategory;
};
