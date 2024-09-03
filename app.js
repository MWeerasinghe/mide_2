const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('./auth');
const { User } = require('./sequelize');

// Initialize Express app
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// User registration route
app.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await User.create({ email, password: hashedPassword });

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
});

// User login route using OAuth2
app.post('/login', passport.authenticate('oauth2', { session: false }), (req, res) => {
  // Generate a JWT with the user's ID
  const token = jwt.sign({ id: req.user.id }, 'your_jwt_secret', { expiresIn: '1h' });
  res.json({ message: 'Logged in successfully', token });
});

// Middleware to authenticate JWT tokens
const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (token) {
    jwt.verify(token, 'your_jwt_secret', (err, user) => {
      if (err) {
        return res.sendStatus(403); // Forbidden
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401); // Unauthorized
  }
};

// Example of a protected route
app.get('/protected', authenticateJWT, (req, res) => {
  res.json({ message: 'This is a protected route' });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
