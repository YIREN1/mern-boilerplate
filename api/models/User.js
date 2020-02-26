const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  methods: {
    type: [String],
    enum: ['local', 'google', 'facebook'],
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.set('toObject', {
  virtuals: true,
});

UserSchema.set('toJSON', {
  virtuals: true,
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
