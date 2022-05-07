const { User: userModel } = require('../models');
const { Category: categoryModel } = require('../models');
const { Post: postsCategoryModel } = require('../models');

const listPostsById = async (id) => {
  const list = await postsCategoryModel.findByPk(id, {
    include: [
      {
        model: userModel,
        as: 'user',
        attributes: {
        exclude: 'password',
        } },
      {
        model: categoryModel,
        as: 'categories',
        through: { attributes: [] },
      },
    ],
  });

  if (!list) return ({ errorMessage: 'Post does not exist' });

  return list;
};

module.exports = {
  listPostsById,
};
