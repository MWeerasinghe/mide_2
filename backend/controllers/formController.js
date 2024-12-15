const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verifyToken = require('../TokenCheck/verifyToken');
const { User } = require('../models');
const {ValidateRegister} = require('../Validates/userValidate');
const OpenMember = require('../models/user');
const router = express.Router();
const sequelize = require('../models/sequelize');

// Register Open Library Member
router.post('/open', async (req, res) => 
    {
        const email = req.body.email;
        const name = req.body.firstName + ' ' + req.body.lastName;
        const password = req.body.password;
        const landline = req.body.landPhone;
        const gender = req.body.gender;
        const nic = req.body.nicNumber;
        const dob = req.body.dob;
        const address = req.body.address;
        const mobile = req.body.mobilePhone;
    
        const school = req.body.school;
        const id_img = req.body.nicImage;
        const confirm_letter = "no"
    
    
        const validationError = ValidateRegister(email, password);
        if (validationError) {
            return res.status(400).json({ message: validationError });
        }
    
        try {
            // Check if email already exists
            const emailCheckQuery = 'SELECT COUNT(*) AS count FROM app_users WHERE "email" = :email';
            const [results] = await sequelize.query(emailCheckQuery, {
                replacements: { email },
                type: sequelize.QueryTypes.SELECT,
            });
    
            if (results.count > 0) {
                return res.status(400).json({ message: 'Email is already registered' });
            }
    
            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);
    
            // Insert new user
            const insertIntoUsersQuery = `
                INSERT INTO app_users (
                    "name", "email", "password", "mobile", "landline", "gender", "nic", "dob", "address", "createdAt", "updatedAt"
                ) VALUES (
                    :name, :email, :password, :mobile, :landline, :gender, :nic, :dob, :address, NOW(), NOW()
                )
            `;

            const insertIntoLibOpenQuery = `
                INSERT INTO app_lib_member_open (
                    "user_id", "school", "id_img", "confirm_letter", "createdAt", "updatedAt"
                ) VALUES (
                    :user_id, :school, :id_img, :confirm_letter, NOW(), NOW()
                )
            `;
    
            await sequelize.query(insertIntoUsersQuery, {
                replacements: {
                    name,
                    email,
                    password: hashedPassword,
                    mobile,
                    landline: landline || null,
                    gender,
                    nic,
                    dob,
                    address,
                },
                type: sequelize.QueryTypes.INSERT,
            });

            const fetchUserIdQuery = `
                SELECT id FROM app_users WHERE "email" = :email
            `;

            const [userResult] = await sequelize.query(fetchUserIdQuery, {
                replacements: { email },
                type: sequelize.QueryTypes.SELECT,
            });

            const userId = userResult?.id;

            if (!userId) {
                return res.status(400).json({ message: 'Failed to retrieve user ID after insert' });
            }


            await sequelize.query(insertIntoLibOpenQuery, {
                replacements: {
                    user_id: userId,
                    school,
                    id_img: "ok",
                    confirm_letter,
                },
                type: sequelize.QueryTypes.INSERT,
            });
    
            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            console.error('Registration error:', {
                message: error.message,
                stack: error.stack,
            });
    
            if (error.name === 'SequelizeUniqueConstraintError') {
                return res.status(400).json({ message: 'Email already exists' });
            }
    
            res.status(400).json({ message: 'Error registering user', error: error.message });
        }
    });


    // ++++++get all requests=========================
    router.get('/getRequests', async (req, res) => {
        try {
            // Query to fetch combined data from the required tables
            const query = `
                SELECT 
                    u.id,
                    u.name,
                    u.email,
                    u.nic,
                    t.temple,
                    u.createdAt AS date
                FROM app_users u
                LEFT JOIN app_lib_member_thero t ON u.id = t.user_id
                WHERE t.temple IS NOT NULL
            `;
    
            const [results] = await sequelize.query(query, {
                type: sequelize.QueryTypes.SELECT,
            });
    
            res.status(200).json({ response: results });
        } catch (error) {
            console.error('Error fetching requests:', error);
            res.status(500).json({ message: 'Error fetching data', error: error.message });
        }
    });
    

module.exports = router;