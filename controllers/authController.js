// controllers/authController.js
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const signToken = (user) => {
  const payload = {
    id: user._id,
    role: user.role,
    email: user.email
  };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '1d' });
};

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ success:false, message: 'Email already in use' });

    const user = new User({ name, email, password, role });
    await user.save();

    res.status(201).json({ success:true, data: user });
  } catch (err) {
    console.error('register error:', err);
    res.status(500).json({ success:false, message: 'Server Error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ success:false, message: 'Email and password are required' });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ success:false, message: 'Invalid credentials' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ success:false, message: 'Invalid credentials' });

    const token = signToken(user);

    // يمكنك أيضاً إرسال الـ cookie بدلًا من body إن أردت
    res.status(200).json({
      success: true,
      token,
      expiresIn: process.env.JWT_EXPIRES_IN || '1d',
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err) {
    console.error('login error:', err);
    res.status(500).json({ success:false, message: 'Server Error' });
  }
};
