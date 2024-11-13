/** @format */

import mongoose from 'mongoose';

const { Schema } = mongoose;
mongoose.connect(
  'mongodb+srv://blackdm1024:Izal12345@pkok.px4tyzq.mongodb.net/?retryWrites=true&w=majority&appName=pkok'
);
// mongoose.connect('mongodb://127.0.0.1:3002/test') .then(() => console.log('Connected!'));
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  apiKey: {
    type: String,
    required: true,
  },
  limit: {
    type: Number,
    default: 35,
  },
  status: {
    type: String,
    enum: ['free', 'premium'],
    default: 'free',
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model('User', userSchema);

export default User;
