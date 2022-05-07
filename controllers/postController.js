const { postParamsVerification } = require('../middlewares/postMiddleware');
const { authenticationToken } = require('../middlewares/userMiddleware');
const postService = require('../services/postService');

const listPostsById = async (req, res) => {
  if (req.failAuthentication) {
    const { statusCode, message } = req.failAuthentication;

    return res.status(statusCode).json({ message });
  }

  const list = await postService.listPostsById(req.params.id);

  if (list.errorMessage) return res.status(404).json({ message: list.errorMessage });

  return res.status(200).json(list);
};

const createPost = async (req, res) => {
  if (req.failAuthentication) {
    const { statusCode, message } = req.failAuthentication;

    return res.status(statusCode).json({ message });
  }

  const post = await postService.createPost(req);

  if (post.errorMessage) return res.status(400).json({ message: post.errorMessage });

  return res.status(201).json(post);
};

module.exports = {
  newPost: [
    authenticationToken,
    postParamsVerification,
    createPost,
  ],
  listPostsById: [
    authenticationToken,
    listPostsById,
  ],
};
