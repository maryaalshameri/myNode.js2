// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

async function protect(req, res, next) {
  try {
    let token;

    // دعم Authorization header: Bearer <token>
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ success:false, message: 'Not authorized, token missing' });
    }

    // تحقق من التوكن
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ success:false, message: 'Invalid or expired token' });
    }

    // احضر بيانات المستخدم (اختياري، يمكن تخطيه إذا لا تريد جلب DB)
    const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.status(401).json({ success:false, message: 'User not found' });

    // اربط المستخدم بالـ request
    req.user = user;
    next();
  } catch (err) {
    console.error('protect middleware error:', err);
    res.status(500).json({ success:false, message: 'Server Error' });
  }
}

module.exports = { protect };
