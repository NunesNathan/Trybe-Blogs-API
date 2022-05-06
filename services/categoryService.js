const { Category: categoryModel } = require('../models');

const createCategory = async (name) => {
  const exists = await categoryModel.findOne({ where: { name } });

  if (exists) return ({ message: 'Category already exists!' });

  const created = await categoryModel.create({ name });

  return created;
};

const getAllCategory = async () => {
  const list = await categoryModel.findAll();

  return list;
};

module.exports = {
  createCategory,
  getAllCategory,
};
