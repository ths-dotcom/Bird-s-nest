const express = require('express');
const router = express.Router();
const userController = require('../app/controllers/UserController');
const signupCheckMiddleware = require('../app/middlewares/signupCheckMiddleware');
const authMiddleware = require('../app/middlewares/authMiddleware');
const userMiddleware = require('../app/middlewares/userMiddleware');

router.get('/orders', userMiddleware, userController.orders);
router.get('/auth-token', userController.authToken);
router.post('/login', userController.login);
router.post('/signup', signupCheckMiddleware, userController.signup);
router.get('/:slugName', userController.infor);

module.exports = router;