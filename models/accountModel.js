import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

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

accountSchema.pre('save', async function (next) {
  const saltRounds = 10;
  this.password = await bcrypt.hash(this.password, saltRounds);
  next();
});

accountSchema.methods.isPasswordMatched = async (
  password,
  candidatePassword
) => {
  return await bcrypt.compare(password, candidatePassword);
};

const Account = mongoose.model('Account', accountSchema);

export { Account };
