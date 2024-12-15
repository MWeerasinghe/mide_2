const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, lib_member_student, lib_member_open } = require('../models');
// const { lib_member_open } = require('../models');
// const { lib_member_student } = require('../models');
const {ValidateRegister} = require('../Validates/userValidate')
const router = express.Router();
const sequelize = require('../models/sequelize');


// ===========================get all Shamma Students and Dhamma teachers==============================================================================
const dhamStudent = ` SELECT * FROM dham_student `;
const dhamTeacher = ` SELECT * FROM dham_teacher `;

router.get('/user/all', async (req, res) => 
{
    try 
    {
        const allDhammaStudent = await sequelize.query(dhamStudent, { type: sequelize.QueryTypes.SELECT });
        const allDhammaTeacher = await sequelize.query(dhamTeacher, { type: sequelize.QueryTypes.SELECT });
        return res.status(200).json({ message: 'Data fetched successfully', data: {students: allDhammaStudent, teachers: allDhammaTeacher }});
    }
    catch(error) 
    {
        return res.status(500).json({ message: 'Internal server error', error: error.message});
    }
});


//==============================mark attendance==============================================================================================
const saveAttendance = `INSERT INTO attendance_marking (user_id, date, time)VALUES (:user_id, :date, :time)`;

router.post('/attendance', async (req, res) => {
    const { user_id, date, time } = req.body;

    try 
    {
        if (!user_id || !date || !time) 
        {
            return res.status(400).json({ message: 'Missing required fields: user_id, date, and time' });
        }

        await sequelize.query(saveAttendance, { replacements: { user_id, date, time }, type: sequelize.QueryTypes.INSERT});
        return res.status(201).json({ message: 'Attendance saved successfully' });
    } 
    catch (error) 
    {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

//==============================get Students attendents========================================
const getAttendanceDataQuery = `
  SELECT 
    u.name AS name,
    u.email AS email,
    am.date AS date,
    ds.dhamma_grade AS grade,
    am.time AS time
  FROM attendance_marking am
  INNER JOIN dham_student ds ON am.user_id = ds.user_id
  INNER JOIN "Users" u ON am.user_id = u.id
  ORDER BY am.date DESC, am.time DESC
`;



router.get('/attendance-data', async (req, res) => 
{
  try 
  {
    const attendanceData = await sequelize.query(getAttendanceDataQuery, { type: sequelize.QueryTypes.SELECT});

    return res.status(200).json({ data: attendanceData });
  } 
  catch (error) 
  {
    console.error('Error fetching attendance data:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});


module.exports = router;