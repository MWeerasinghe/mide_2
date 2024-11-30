const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, lib_member_student, lib_member_open } = require('../models');
// const { lib_member_open } = require('../models');
// const { lib_member_student } = require('../models');
const {ValidateRegister} = require('../Validates/userValidate')
const router = express.Router();
const sequelize = require('../models/sequelize');



//_____________register_______________________________________
router.post('/register', async (req, res) => 
{
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ email, password: hashedPassword });
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(400).json({ message: 'Error registering user', error });
    }
});



//_____________login_______________________________________
router.post('/login', async (req, res) => 
{
    const { email, password} = req.body;

    // Basic validation
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const user = await User.findOne({ where: { email } });
        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ message: 'Login successful', token });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(400).json({ message: 'Error logging in', error });
    }
});


//_____________update user passwords_______________________________________
router.put('/user', async (req, res) => {
    try {
        const { email, currentPassword, confirmPassword } = req.body;

        if (!email || !currentPassword || !confirmPassword) {
            return res.status(400).json({ message: 'Email, current password, and new password are required' });
        }

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isCorrect = await bcrypt.compare(currentPassword, user.password);
        if (!isCorrect) {
            return res.status(400).json({ message: 'Incorrect current password' });
        }

        const validationError = ValidateRegister(email, confirmPassword);
        if (validationError) {
            return res.status(400).json({ message: validationError });
        }

        const hashedPassword = await bcrypt.hash(confirmPassword, 10);

        const [updated] = await User.update({ password: hashedPassword }, { where: { email } });

        if (updated) {
            return res.status(200).json({ message: 'Password successfully updated' });
        } else {
            return res.status(400).json({ message: 'Failed to update password' });
        }
    } catch (error) {
        console.error('Error updating password:', error);
        return res.status(500).json({ message: 'Error updating password', error: error.message || 'Unknown error' });
    }
});



//________________________get permissions___________________
const libMemberOpenQuery = `
    SELECT * 
    FROM lib_member_open 
    WHERE user_id = :userId 
    LIMIT 1
`;

const libMemberStudentQuery = `
    SELECT * 
    FROM lib_member_student 
    WHERE user_id = :userId 
    LIMIT 1
`;


router.get('/user/:id', async (req, res) => {
    const id = req.params.id;

    try {
        if (!id) {
            return res.status(400).json({ message: 'Invalid id' });
        }

        // Find the user in the `User` table
        const user = await User.findOne({ where: { id } });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Fetch related data using raw queries
        const libMemberOpen = await sequelize.query(libMemberOpenQuery, {replacements: { userId: id }, type: sequelize.QueryTypes.SELECT,
        }).catch(err => {
            console.error('Error fetching lib_member_open:', err);
            throw new Error('Error fetching lib_member_open');
        });

        const libMemberStudent = await sequelize.query(libMemberStudentQuery, { replacements: { userId: id }, type: sequelize.QueryTypes.SELECT,
        }).catch(err => {
            console.error('Error fetching lib_member_student:', err);
            throw new Error('Error fetching lib_member_student');
        });

        // Prepare the response
        const responseData = {
            user,
            libMemberOpen: libMemberOpen.length > 0 ? libMemberOpen[0] : null,
            libMemberStudent: libMemberStudent.length > 0 ? libMemberStudent[0] : null,
        };
        return res.status(200).json({ message: 'User found', data: responseData });
    } 
    catch (error) 
    {
        console.error('Error retrieving user:', error);
        return res.status(500).json({ message: 'Error retrieving user', error: error.message || 'Unknown error' });
    }
});


//_____________Verification purpose_______________
router.post('/verify', async (req, res) => 
{
    return res.status(200).json({message: 'valid'});
});

module.exports = router;