// models/userModel.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Name is required'], trim: true },
  email: { type: String, required: [true, 'Email is required'], unique: true, lowercase: true, trim: true },
  password: { type: String, required: [true, 'Password is required'] },
  role: { type: String, enum: ['user','admin'], default: 'user' }
}, {
  timestamps: true,
  toJSON: {
    transform(doc, ret) {
      delete ret.password;
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});

// قبل الحفظ: هاش كلمة المرور إذا تغيّرت/جديدة
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

// مثيل لمقارنة كلمات المرور
UserSchema.methods.comparePassword = async function(candidate) {
  return bcrypt.compare(candidate, this.password);
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
