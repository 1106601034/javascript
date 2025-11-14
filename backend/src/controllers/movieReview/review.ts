import type { RequestHandler } from "express";
import { isValidObjectId, Types } from "mongoose";
import { Movie } from "../../models/movie.js";
import { Review } from "../../models/review.js";
import { buildMovieFilter } from "./helper.js";

type ReviewPayload = {
    rating?: unknown;
    comment?: unknown;
    content?: unknown;
    author?: unknown;
    legacyId?: unknown;
};

const extractReviewContent = (body: ReviewPayload): string => {
    const value = typeof body.comment === "string"
        ? body.comment
        : typeof body.content === "string"
            ? body.content
            : "";

    return value.trim();
};

const sanitizeReviewUpdate = (rawBody: unknown): {
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

const isValidReviewId = (rawId?: string): rawId is string => Boolean(rawId && isValidObjectId(rawId));

const recalculateMovieReviewStats = async (movieId: Types.ObjectId): Promise<{
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

const serializeReview = (review: {
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

export const getReviewsByMovie: RequestHandler = async (req, res) => {
    const filter = buildMovieFilter(req.params.id);

    if (!filter) {
        return res.status(400).json({ error: "Invalid movie id" });
    }

    try {
        const movie = await Movie.findOne(filter, { title: 1, averageRating: 1, reviewCount: 1 });

        if (!movie) {
            return res.status(404).json({ error: "Movie not found" });
        }

        const reviews = await Review.find({ movie: movie._id }).sort({ createdAt: -1 });

        return res.json({
            title: movie.title,
            averageRating: movie.averageRating ?? 0,
            reviewCount: movie.reviewCount ?? reviews.length,
            reviews: reviews.map((review) => serializeReview(review)),
        });
    } catch {
        return res.status(500).json({ error: "Unable to fetch reviews" });
    }
};

export const addReviewsByMovie: RequestHandler = async (req, res) => {
    const filter = buildMovieFilter(req.params.id);

    if (!filter) {
        return res.status(400).json({ error: "Invalid movie id" });
    }

    const body = (typeof req.body === "object" && req.body !== null)
        ? (req.body as ReviewPayload)
        : {};
    const ratingValue = Number(body.rating);
    const content = extractReviewContent(body);
    const author = typeof body.author === "string" ? body.author.trim() : "";
    const legacyId = Number(body.legacyId);

    if (!Number.isFinite(ratingValue) || ratingValue < 0 || ratingValue > 5) {
        return res.status(400).json({ error: "Rating must be a number between 0 and 5" });
    }

    if (!content) {
        return res.status(400).json({ error: "Review content must be a non-empty string" });
    }

    try {
        const movie = await Movie.findOne(filter);

        if (!movie) {
            return res.status(404).json({ error: "Movie not found" });
        }

        const review = await Review.create({
            movie: movie._id,
            rating: ratingValue,
            content,
            author,
            legacyId: Number.isFinite(legacyId) ? legacyId : undefined,
        });

        const { averageRating, reviewCount } = await recalculateMovieReviewStats(movie._id);

        return res.status(201).json({
            msg: "Review added successfully",
            averageRating,
            reviewCount,
            review: serializeReview(review),
        });
    } catch {
        return res.status(500).json({ error: "Unable to add review" });
    }
};

export const getReviewsByMovieAndReviewId: RequestHandler = async (req, res) => {
    const filter = buildMovieFilter(req.params.id);
    const { reviewId } = req.params;

    if (!filter || !isValidReviewId(reviewId)) {
        return res.status(400).json({ error: "Invalid movie or review id" });
    }

    try {
        const movie = await Movie.findOne(filter, { _id: 1, title: 1 });

        if (!movie) {
            return res.status(404).json({ error: "Movie not found" });
        }

        const review = await Review.findOne({ _id: reviewId, movie: movie._id });

        if (!review) {
            return res.status(404).json({ error: "Review not found" });
        }

        return res.json({
            movieId: movie._id.toString(),
            title: movie.title,
            review: serializeReview(review),
        });
    } catch {
        return res.status(500).json({ error: "Unable to fetch review" });
    }
};

export const updateReviewsByMovieAndReviewId: RequestHandler = async (req, res) => {
    const filter = buildMovieFilter(req.params.id);
    const { reviewId } = req.params;

    if (!filter || !isValidReviewId(reviewId)) {
        return res.status(400).json({ error: "Invalid movie or review id" });
    }

    const { update, error } = sanitizeReviewUpdate(req.body);

    if (error || !update) {
        return res.status(400).json({ error: error ?? "Invalid payload" });
    }

    try {
        const movie = await Movie.findOne(filter, { _id: 1 });

        if (!movie) {
            return res.status(404).json({ error: "Movie not found" });
        }

        const review = await Review.findOneAndUpdate(
            { _id: reviewId, movie: movie._id },
            update,
            { new: true, runValidators: true },
        );

        if (!review) {
            return res.status(404).json({ error: "Review not found" });
        }

        const { averageRating, reviewCount } = await recalculateMovieReviewStats(movie._id);

        return res.json({
            msg: "Review updated successfully",
            averageRating,
            reviewCount,
            review: serializeReview(review),
        });
    } catch {
        return res.status(500).json({ error: "Unable to update this review" });
    }
};

export const deleteReviewsByMovieAndReviewId: RequestHandler = async (req, res) => {
    const filter = buildMovieFilter(req.params.id);
    const { reviewId } = req.params;

    if (!filter || !isValidReviewId(reviewId)) {
        return res.status(400).json({ error: "Invalid movie or review id" });
    }

    try {
        const movie = await Movie.findOne(filter, { _id: 1 });

        if (!movie) {
            return res.status(404).json({ error: "Movie not found" });
        }

        const review = await Review.findOneAndDelete({ _id: reviewId, movie: movie._id });

        if (!review) {
            return res.status(404).json({ error: "Review not found" });
        }

        const { averageRating, reviewCount } = await recalculateMovieReviewStats(movie._id);

        return res.json({
            msg: "Review deleted successfully",
            averageRating,
            reviewCount,
        });
    } catch {
        return res.status(500).json({ error: "Unable to delete this review" });
    }
};
