const { User: userModel } = require('../models');
const { Category: categoryModel } = require('../models');
const { Post: postModel } = require('../models');
const { PostsCategory: postCategoryModel } = require('../models');

const listPostsById = async (id) => {
  const list = await postModel.findByPk(id, {
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

const createPost = async ({ body: { title, content, categoryIds }, actualUser: { id } }) => {
  const postObject = { title, content, userId: id };
  const createdPost = await postModel.create(postObject,
    { fields: ['id', 'title', 'content', 'userId'] });

  const allIdsExists = await Promise.all(categoryIds.map(async (eachId) => {
    const exists = await categoryModel.findByPk(eachId);

    if (!exists) return false;
    await postCategoryModel.create({
      postId: createdPost.id,
      categoryId: eachId,
    });
    return true;
  }));

  return ((allIdsExists.every((verificated) => verificated === true)) ? createdPost : (
    { errorMessage: '"categoryIds" not found' }));
};

module.exports = {
  listPostsById,
  createPost,
};
