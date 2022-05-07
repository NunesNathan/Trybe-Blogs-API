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

module.exports = {
  listPostsById: [
    authenticationToken,
    listPostsById,
  ],
};
