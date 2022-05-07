const express = require('express');
const userController = require('../controllers/userController');
const categoryController = require('../controllers/categoryController');
const postController = require('../controllers/postController');

const defaultRoute = (_request, response) => response.send();

const router = express.Router();

router
  .get('/', defaultRoute)
  .post('/user', userController.newUser)
  .post('/login', userController.attemptToLogin)
  .get('/user', userController.listUsers)
  .get('/user/:id', userController.findUser)
  .post('/categories', categoryController.newCategory)
  .get('/categories', categoryController.listCategories)
  .post('/post', postController.newPost)
  .get('/post/:id', postController.listPostsById);

module.exports = router;
