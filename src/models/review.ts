import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    lectureId: { type: String, required: true },
    userId: { type: String, required: true },
    userEmail: { type: String, required: true },
    reviewText: { type: String, required: true },
    rating: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Review || mongoose.model("Review", reviewSchema);
