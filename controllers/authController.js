// controllers/authController.js
const User = require('../models/userModel');

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // تأكد من أن الإيميل غير موجود مسبقًا
    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ success: false, message: 'Email already in use' });

    const user = new User({ name, email, password, role });
    await user.save();

    // لا نُرجع كلمة المرور (Schema يحذفها في toJSON)
    res.status(201).json({ success: true, data: user });
  } catch (err) {
    console.error('register error:', err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
