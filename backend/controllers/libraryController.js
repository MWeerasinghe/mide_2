const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { Lib_member_open } = require('../models');
const router = express.Router();

// Registration endpoint
router.post('/user', async (req, res) => 
{
    const { email, password, name, createdAt, updatedAt, mobile, landline, gender, nic, dob, address } = req.body;

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