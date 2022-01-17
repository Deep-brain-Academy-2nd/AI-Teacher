import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  id: { type: String },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  auth: { type: String, required: true },
  created: { type: String, required: true },
  updated: { type: String, required: true },
});

export default mongoose.models.User || mongoose.model('User', userSchema);
