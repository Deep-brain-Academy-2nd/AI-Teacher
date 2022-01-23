import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
  lectureId: { type: String, required: true },
  userId: { type: String, required: true },
  status: { type: Boolean, required: true },
  createdAt: { type: String, required: true },
});

export default mongoose.models.Like || mongoose.model("Like", likeSchema);
