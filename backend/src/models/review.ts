import { Schema, model, InferSchemaType } from "mongoose";

const reviewSchema = new Schema({
    legacyId: {
        type: Number,
        unique: true,
        sparse: true,
        required: false,
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
}, { timestamps: true });

export type ReviewDocument = InferSchemaType<typeof reviewSchema>;

export const Review = model<ReviewDocument>("review", reviewSchema);
