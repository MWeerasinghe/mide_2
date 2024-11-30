const express = require('express');
const router = express.Router();
const verifyToken = require('../TokenCheck/verifyToken');


const libraryController = require('../controllers/libraryController');
const authController = require('../controllers/auth');
const userController = require('../controllers/userController');

router.use('/verify-token', verifyToken, userController);
router.use('/auth', authController);
router.use('/user', verifyToken, userController);


module.exports = router;