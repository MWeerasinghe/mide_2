const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => 
{
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1]; // Extract the token after 'Bearer'
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach decoded user information to the request
        next(); // Proceed to the next middleware or controller
    } 
    catch (error) 
    {
        console.error('Token verification error:', error);
        res.status(403).json({ message: 'Forbidden: Invalid or expired token' });
    }
};

module.exports = verifyToken;
