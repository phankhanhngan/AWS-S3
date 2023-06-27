import mongoose from 'mongoose';
const { Schema } = mongoose;

const accountSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Account must have username!'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Account must have password!']
  },
  avatar: {
    type: String
  }
});

const Account = mongoose.model('Account', accountSchema);

export { Account };
