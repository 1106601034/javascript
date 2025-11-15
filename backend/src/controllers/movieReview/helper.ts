import { isValidObjectId, Types } from "mongoose";
import type { FilterQuery } from "mongoose";
import { Movie } from "../../models/movie.js";
import { Review } from "../../models/review.js";
import { forbiddenFields } from "./config.js";
import type { MovieDocument } from "../../models/movie.js";
import type { ReviewPayload } from "./type.ts";

// alias MovieFilter so anything we build to query Mongo has proper typing.
type MovieFilter = FilterQuery<MovieDocument>;

// This takes whatever came in as body.types and turns it into a clean array of non‑empty strings.
export const normalizeTypes = (rawTypes: unknown): string[] => {
    if (!Array.isArray(rawTypes)) {
        return [];
    }

    return rawTypes
        .map((value) => typeof value === "string" ? value.trim() : "")
        .filter((value) => value.length > 0);
};

// check if id is _id.
export const buildMovieFilter = (rawId?: string): MovieFilter | null => {
    // false if rawId is null.
    if (!rawId) {
        return null;
    }
    // if rawId is _id which is from mongoDB then return
    if (isValidObjectId(rawId)) {
        return { _id: rawId };
    }

    return null;
};

// check user input before update by id.
export const sanitizeMovieUpdate = (rawBody: unknown): {
    update?: Record<string, unknown>;
    error?: string;
} => {
    if (!rawBody || typeof rawBody !== "object") {
        return { error: "Request body must be an object" };
    }

    for (const field of forbiddenFields) {
        if (field in rawBody) {
            return { error: `Field "${field}" cannot be modified` };
        }
    }

    const body = rawBody as Record<string, unknown>;
    const update: Record<string, unknown> = {};

    if (typeof body.title === "string" && body.title.trim()) {
        update.title = body.title.trim();
    }

    if (typeof body.description === "string") {
        update.description = body.description.trim();
    }

    if ("legacyId" in body) {
        const legacyId = Number(body.legacyId);
        if (!Number.isFinite(legacyId)) {
            return { error: "legacyId must be a number" };
        }
        update.legacyId = legacyId;
    }

    if ("types" in body) {
        const normalizedTypes = normalizeTypes(body.types);
        if (normalizedTypes.length === 0) {
            return { error: "types must be a non-empty array of strings" };
        }
        update.types = normalizedTypes;
    }

    if (Object.keys(update).length === 0) {
        return { error: "No updatable fields provided" };
    }

    return { update };
};


export const sanitizeReviewUpdate = (rawBody: unknown): {
    update?: {
        rating?: number;
        content?: string;
        author?: string;
    };
    error?: string;
} => {
    if (!rawBody || typeof rawBody !== "object") {
        return { error: "Request body must be an object" };
    }

    const body = rawBody as ReviewPayload;
    const update: Record<string, unknown> = {};

    if ("rating" in body) {
        const ratingValue = Number(body.rating);
        if (!Number.isFinite(ratingValue) || ratingValue < 0 || ratingValue > 5) {
            return { error: "Rating must be a number between 0 and 5" };
        }
        update.rating = ratingValue;
    }

    if ("comment" in body || "content" in body) {
        const content = extractReviewContent(body);
        if (!content) {
            return { error: "Review content must be a non-empty string" };
        }
        update.content = content;
    }

    if ("author" in body && typeof body.author === "string") {
        update.author = body.author.trim();
    }

    if (Object.keys(update).length === 0) {
        return { error: "No updatable fields provided" };
    }

    return { update: update as { rating?: number; content?: string; author?: string } };
};

export const extractReviewContent = (body: ReviewPayload): string => {
    const value = typeof body.comment === "string"
        ? body.comment
        : typeof body.content === "string"
            ? body.content
            : "";

    return value.trim();
};


export const isValidReviewId = (rawId?: string): rawId is string => Boolean(rawId && isValidObjectId(rawId));


export const recalculateMovieReviewStats = async (movieId: Types.ObjectId): Promise<{
    averageRating: number;
    reviewCount: number;
}> => {
    const stats = await Review.aggregate<{ average: number; count: number }>([
        { $match: { movie: movieId } },
        {
            $group: {
                _id: "$movie",
                average: { $avg: "$rating" },
                count: { $sum: 1 },
            },
        },
    ]);

    const average = stats[0]?.average ?? 0;
    const averageRating = Number(average.toFixed(2));
    const reviewCount = stats[0]?.count ?? 0;

    await Movie.findByIdAndUpdate(movieId, { averageRating, reviewCount });

    return { averageRating, reviewCount };
};

export const serializeReview = (review: {
    _id: Types.ObjectId;
    rating: number;
    content: string;
    author?: string;
    legacyId?: number | null;
    createdAt?: Date;
    updatedAt?: Date;
}) => ({
    id: review._id.toString(),
    rating: review.rating,
    content: review.content,
    author: review.author ?? "",
    legacyId: typeof review.legacyId === "number" ? review.legacyId : undefined,
    createdAt: review.createdAt,
    updatedAt: review.updatedAt,
});
