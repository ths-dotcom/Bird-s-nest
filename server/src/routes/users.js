const express = require('express');
const router = express.Router();
const userController = require('../app/controllers/UserController');

router.post('/signup', userController.signup);
router.get('/:slugName', userController.infor);

module.exports = router;