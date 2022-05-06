const { authenticationToken } = require('../middlewares/userMiddleware');
const { categoryParamsVerification } = require('../middlewares/categoryMiddleware');
const categoryService = require('../services/categoryService');

const createCategory = async (req, res) => {
  if (req.failAuthentication) {
    const { statusCode, message } = req.failAuthentication;

    return res.status(statusCode).json({ message });
  }

  const category = await categoryService.createCategory(req.body.name);

  if (category.message) return res.status(409).json({ message: category.message });
  return res.status(201).json(category);
};

module.exports = {
  newCategory: [
    authenticationToken,
    categoryParamsVerification,
    createCategory,
  ],
};
