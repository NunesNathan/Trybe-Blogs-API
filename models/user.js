const modelSchema = (DataTypes) => ({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  displayName: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  image: DataTypes.STRING,
});

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', modelSchema(DataTypes), {
    modelName: 'Users',
    timestamps: false,
  });

  User.associate = (models) => {
    User.hasMany(models.Post, {
      foreignKey: 'id',
      as: 'userPosts',
    });
  };

  return User;
};
