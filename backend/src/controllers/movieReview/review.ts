import type { RequestHandler } from "express";
import { Movie } from "../../models/movie.js";
import { Review } from "../../models/review.js";
import {
    buildMovieFilter,
    serializeReview,
    extractReviewContent,
    recalculateMovieReviewStats,
    isValidReviewId,
    sanitizeReviewUpdate,
} from "./helper.js";
import type { ReviewPayload } from "./type.ts";

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
