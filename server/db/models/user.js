import mongoose from 'mongoose';
import utils from '../../utils';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    lowercase: true,
    unique: true,
    trim: true,
    required: 'Email address is required',
    validate: [utils.validateEmail, 'Please fill a valid email address']
  },
  password: String,
  createDate: Date
});

const User = mongoose.model('User', userSchema);

export default mongoose.models.User || User;
