import { Schema, model, InferSchemaType } from "mongoose";

const reviewSchema = new Schema({
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

export type ReviewDocument = InferSchemaType<typeof reviewSchema>;

export const Review = model<ReviewDocument>("review", reviewSchema);
