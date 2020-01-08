import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// User
const validateEmailRegex = new RegExp(
  '/^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$/'
);
const validateEmail = email => {
  return validateEmailRegex.test(email);
};

const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    lowercase: true,
    unique: true,
    trim: true,
    required: 'Email address is required',
    validate: [validateEmail, 'Please fill a valid email address'],
    match: [validateEmailRegex, 'Please fill a valid email address']
  },
  password: String,
  createDate: Date
});

const User = mongoose.model('User', userSchema);

export default mongoose.models.User || User;
