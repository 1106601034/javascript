import { Schema, model, type InferSchemaType } from "mongoose";

const movieSchema = new Schema({
    legacyId: {
        type: Number,
        unique: true,
        sparse: true,
        required: false,
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        default: "",
        trim: true,
    },
    types: {
        type: [String],
        required: true,
        validate: {
            validator(values: unknown[]): boolean {
                return Array.isArray(values)
                    && values.every((value) => typeof value === "string" && value.trim().length > 0)
                    && values.length > 0;
            },
            message: "types must be a non-empty array of strings",
        },
    },
    averageRating: {
        type: Number,
        default: 0,
    },
    reviewCount: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });

export type MovieDocument = InferSchemaType<typeof movieSchema>;

export const Movie = model<MovieDocument>("movie", movieSchema);
