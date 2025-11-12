import { Schema, model } from "mongoose";
import type { InferSchemaType } from "mongoose";

const movieSchema = new Schema({
    id: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    type: {
        type: String,
        required: true,
    },
    averageRating: {
        type: Number,
    },
    reviews: {
        type: [Schema.Types.Mixed],
        default: [],
    },
});

export type MovieDocument = InferSchemaType<typeof movieSchema>;

export const Movie = model<MovieDocument>("movie", movieSchema);
