const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verifyToken = require('../TokenCheck/verifyToken');
const { User } = require('../models');
const { Teacher6 } = require('../models/teacher_6');
const { ValidateRegister } = require('../Validates/userValidate')
const router = express.Router();
const sequelize = require('../models/sequelize');



//__________________get buddha Charithaya_____________________
router.get('/getBuddhaDetails/:user_id', async (req, res) => 
{
    try 
    {
        const user_id = req.params.user_id;
        const query = `SELECT * FROM buddha_charithaya WHERE user_id = :user_id`;
        const buddha = await sequelize.query(query, { replacements: { user_id }, type: sequelize.QueryTypes.SELECT});

        if(buddha)
        {
            console.log(buddha);
            res.status(200).json({ success: true, data: buddha });
        }
        else
        {
            res.status(200).json({ success: false});
        }
    } 
    catch (error) 
    {
        console.error('Error fetching student:', error);
        res.status(500).json({ success: false, message: 'An error occurred while retrieving student.', error: error.message });
    }
});


//__________________get Abhidharmaya_____________________
router.get('/getAbhidharmaDetails/:user_id', async (req, res) => 
{
    try 
    {
        const user_id = req.params.user_id;
        const query = `SELECT * FROM abhidharmaya WHERE user_id = :user_id`;
        const [buddha] = await sequelize.query(query, { replacements: { user_id }, type: sequelize.QueryTypes.SELECT});

        if(buddha)
        {
            res.status(200).json({ success: true, data: buddha });
        }
        else
        {
            res.status(400).json({ success: false});
        }       
    } 
    catch (error) 
    {
        console.error('Error fetching student:', error);
        res.status(500).json({ success: false, message: 'An error occurred while retrieving student.', error: error.message });
    }
});

//__________________get pali_____________________
router.get('/getPaliaDetails/:user_id', async (req, res) => 
{
    try 
    {
        const user_id = req.params.user_id;
        const query = `SELECT * FROM pali WHERE user_id = :user_id`;
        const [buddha, metadata] = await sequelize.query(query, { replacements: { user_id }, type: sequelize.QueryTypes.SELECT});

        if(buddha)
        {
            res.status(200).json({ success: true, data: buddha });
        }
        else
        {
            res.status(400).json({ success: false});
        }
    } 
    catch (error) 
    {
        console.error('Error fetching student:', error);
        res.status(500).json({ success: false, message: 'An error occurred while retrieving student.', error: error.message });
    }
});

//_________________________GET MATERIALS________________________________________________
//______________________________________________________________________________________
router.post('/getMaterials', async (req, res) => 
{
    try {
        const { year, grade, subject } = req.body;

        let query;

        if (grade == '6') {
            query = `SELECT * FROM teachers_6 WHERE year = :year AND subject = :subject`;
        } else if (grade == '7') {
            query = `SELECT * FROM teachers_7 WHERE year = :year AND subject = :subject`;
        } else if (grade == '8') {
            query = `SELECT * FROM teachers_8 WHERE year = :year AND subject = :subject`;
        } else if (grade == '9') {
            query = `SELECT * FROM teachers_9 WHERE year = :year AND subject = :subject`;
        } else if (grade == '10') {
            query = `SELECT * FROM teachers_10 WHERE year = :year AND subject = :subject`;
        } else if (grade == '11') {
            query = `SELECT * FROM teachers_11 WHERE year = :year AND subject = :subject`;
        } else {
            return res.status(400).json({ success: false, message: 'Invalid grade provided.' });
        }

        // Execute the query
        const buddha = await sequelize.query(query, { replacements: { year, subject }, type: sequelize.QueryTypes.SELECT });

        if (buddha && buddha.length > 0)
        {
            return res.status(200).json({ success: true, data: buddha });
        } 
        else 
        {
            return res.status(404).json({ success: false, message: 'No data found.' });
        }
    } 
    catch (error) 
    {
        console.error('Error fetching materials:', error);
        res.status(500).json({success: false, message: 'An error occurred while retrieving materials.', error: error.message });
    }
});


module.exports = router;