const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, lib_member_student, lib_member_open } = require('../models');
// const { lib_member_open } = require('../models');
// const { lib_member_student } = require('../models');
const {ValidateRegister} = require('../Validates/userValidate')
const router = express.Router();
const sequelize = require('../models/sequelize');


const attendanceQuery = `SELECT * FROM attendance_marking`;
router.get('/user/all', async (req, res) => {
    try {
        const attendanceData = await sequelize.query(attendanceQuery, { type: sequelize.QueryTypes.SELECT });
        return res.status(200).json({ message: 'Data fetched successfully', attendance: attendanceData });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});


//_____________________post attendance________________________
const checkUserExistsQuery = `
  SELECT COUNT(*) AS count
  FROM dham_student
  WHERE user_id = :user_id
`;

const checkAttendanceExistsQuery = `
  SELECT COUNT(*) AS count
  FROM attendance_marking
  WHERE user_id = :user_id AND date = :date
`;

const insertAttendanceQuery = `
  INSERT INTO attendance_marking (user_id, date, time)
  VALUES (:user_id, :date, :time)
`;

const getUserDetailsQuery = `
  SELECT *
  FROM dham_student
  WHERE user_id = :user_id
`;

router.post('/mark', async (req, res) => {
  const { user_id, date, time } = req.body;

  if (!user_id || !date || !time) {
    return res.status(400).json({ message: 'user_id, date, and time are required' });
  }

  try {
    // Check if user exists
    const [userExistsResult] = await sequelize.query(checkUserExistsQuery, {
      replacements: { user_id },
      type: sequelize.QueryTypes.SELECT,
    });

    if (userExistsResult.count === 0) {
      return res.status(400).json({ message: 'Invalid user id. User does not exist.' });
    }

    // Check if attendance already exists for this user on this date
    const [attendanceExistsResult] = await sequelize.query(checkAttendanceExistsQuery, {
      replacements: { user_id, date },
      type: sequelize.QueryTypes.SELECT,
    });

    if (attendanceExistsResult.count > 0) {
      return res.status(400).json({ message: 'Attendance already marked for this user today.' });
    }

    // Insert attendance
    await sequelize.query(insertAttendanceQuery, {
      replacements: { user_id, date, time },
      type: sequelize.QueryTypes.INSERT,
    });

    // Fetch user details
    const [userDetails] = await sequelize.query(getUserDetailsQuery, {
      replacements: { user_id },
      type: sequelize.QueryTypes.SELECT,
    });

    return res.status(201).json({
      message: 'Attendance marked successfully',
      user: userDetails,
    });
  } catch (error) {
    console.error('Error processing attendance:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});




module.exports = router;