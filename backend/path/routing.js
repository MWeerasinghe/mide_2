const express = require('express');
const router = express.Router();
const verifyToken = require('../TokenCheck/verifyToken');


const libraryController = require('../controllers/libraryController');
const authController = require('../controllers/auth');
const userController = require('../controllers/userController');
const dhamController = require('../controllers/dhamController');
const attendanceController = require('../controllers/attendanceController');
const formController = require('../controllers/formController');
const teacherController = require('../controllers/teacherController');
const studentController = require('../controllers/studentController');

router.use('/verify-token', verifyToken, userController);
router.use('/auth', authController);
router.use('/user', userController);
router.use('/school', dhamController);
router.use('/attendance', attendanceController);
router.use('/form', formController);
router.use('/getRequests', formController);

router.use('/teachers', teacherController);
router.use('/students', studentController);

module.exports = router;