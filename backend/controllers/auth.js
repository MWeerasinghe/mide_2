const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verifyToken = require('../TokenCheck/verifyToken');
const { User } = require('../models');
const {ValidateRegister} = require('../Validates/userValidate')
const router = express.Router();


//__________________Register user_____________________
router.post('/register', async (req, res) => 
{
    const { email, password, landline, gender, nic, dob, address, name, mobile } = req.body;

    const validationError = ValidateRegister(email, password);
    if(validationError) 
    {
        return res.status(400).json({ message: validationError });
    }

    try 
    {
        const ifExist = await User.findOne({ where: { email } });
        if(ifExist)
        {
            return res.status(400).json({ message: 'Email is already registerred' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ email, password: hashedPassword, landline: landline || null, gender: gender || null, nic: nic || null, dob: dob || null,  address: address || null,  name: name || null, mobile: mobile || null});

        res.status(201).json({ message: 'User registered successfully',  user: { id: user.id, email: user.email, name: user.name, createdAt: user.createdAt,updatedAt: user.updatedAt }});
    } 
    catch (error) 
    {
        console.error('Registration error:', error);

        if (error.name === 'SequelizeUniqueConstraintError') 
        {
            return res.status(400).json({ message: 'Email already exists' });
        }
        res.status(400).json({ message: 'Error registering user', error });
    }
});




//__________________Login user_____________________
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
router.put('/user', async (req, res) => 
{
    try 
    {
        const { email, password, mobile, newpassword} = req.body;

        if(!email || !password || !mobile || !newpassword) {
            return res.status(400).json({ message: 'Email and password are required' });
        }
        const ifInclude = await User.findOne({where:{email, mobile}});
        
        if(!ifInclude || ifInclude == null) {
            return res.status(400).json({ message: 'Incorrect Current email or mobile' });
        }

        const isCorrect = await bcrypt.compare(password, ifInclude.password);
        // return res.status(400).json({isCorrect});

        if(!isCorrect){
            return res.status(400).json({ message: 'Incorrect current password' });
        }  
        
        const validationError = ValidateRegister(email, newpassword, mobile); 

        if(validationError !== null)
        {
            return res.status(400).json({ message: validationError });
        }
        const hashedPassword = await bcrypt.hash(newpassword, 10);

        const details =  await User.update({ password: hashedPassword }, { where: { email, mobile } });

        return res.status(200).json({message: 'Password is changed', details});
    }
    catch (error) 
    {
        res.status(500).json({ message: 'Error updating password', error });
    }
});


//_____________________verify Token_____________________________________
router.get('/profile', verifyToken, async (req, res) => 
{
    try 
    {
        const user = await User.findByPk(req.user.id); // Retrieve user info from DB using decoded ID
        if(!user) 
        {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } 
    catch(error) 
    {
        console.error('Error retrieving profile:', error);
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;