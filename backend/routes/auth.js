const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const validateUser = require('../Validates/userValidate')
const router = express.Router();

// Registration endpoint
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

// Login endpoint
router.post('/login', async (req, res) => {
    const { email, password, mobile, landline, gender, nic, dob, address} = req.body;

    // Basic validation
    if (!email || !password || !gender || !dob) {
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
router.put('/user', async (req, res) => 
{
    try 
    {
        const { email, password, mobile, newpassword} = req.body;

        if(!email || !password || !mobile || !newpassword) {
            return res.status(400).json({ message: 'Email and password are required' });
        }
        const ifInclude = await User.findOne({where:{email, mobile}});

        if(!ifInclude) {
            return res.status(400).json({ message: 'Incorrect Current email or mobile' });
        }

        const isCorrect = bcrypt.compare(password, ifInclude.password);

        if(!isCorrect){
            return res.status(400).json({ message: 'Incorrect current password' });
        }  
        
        const validationError = validateUser(email, newpassword, mobile); 

        if(validationError !==0)
        {
            return res.status(400).json({ message: validationError });
        }
        const hashedPassword = await bcrypt.hash(newpassword, 10);

        await User.update({ password: hashedPassword }, { where: { email, mobile } });

        return res.status(200).json({ message: 'password successfully updated' });
    } 
    catch (error) 
    {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Error updating password', error });
    }
});
module.exports = router;