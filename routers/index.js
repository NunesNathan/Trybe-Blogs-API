const express = require('express');
const userController = require('../controllers/userController');
const categoryController = require('../controllers/categoryController');

const defaultRoute = (_request, response) => response.send();

const router = express.Router();

router
  .get('/', defaultRoute)
  .post('/user', userController.newUser)
  .post('/login', userController.attemptToLogin)
  .get('/user', userController.listUsers)
  .get('/user/:id', userController.findUser)
  .post('/categories', categoryController.newCategory);

module.exports = router;
