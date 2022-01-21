import mongoose from 'mongoose';

const classSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  model: { type: String, required: true },
  clothe: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  description: { type: String, required: true },
  imageFile: { type: String, required: true },
  videoURL: { type: String, required: true },
  createdAt: {
    type: String,
    required: true,
  },
  updatedAt: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Class || mongoose.model('Class', classSchema);
