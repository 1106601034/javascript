import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  rating: {
    type: String,
    required: true,
  },
});

export const Review = mongoose.model("review", ReviewSchema);
