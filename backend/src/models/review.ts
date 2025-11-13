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
        type: Number,
        required: true,
        min: 0,
        max: 5,
    },
});

export type ReviewDocument = InferSchemaType<typeof reviewSchema>;

export const Review = model<ReviewDocument>("review", reviewSchema);
