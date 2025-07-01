const jwt = require('jsonwebtoken');
const UserModel = require('../Models/User');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Authentication failed', success: false });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findById(decoded._id);
    
    if (!user) {
      return res.status(401).json({ message: 'Authentication failed', success: false });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Authentication failed', success: false });
  }
};

module.exports = authMiddleware;