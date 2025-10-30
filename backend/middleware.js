const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;
    if (!bearerToken || !bearerToken.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided or invalid format' });
    }
    const token = bearerToken.split(' ')[1];
    const decoded = jwt.verify(token, 'secret');
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = { verifyToken };