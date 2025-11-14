import type { RequestHandler } from "express";
import { Movie } from "../../models/movie.js";
// import { Review } from "../../models/review.js";
import {
    buildMovieFilter,
    calculateAverageRating,
    sanitizeMovieUpdate,
} from "./helper.js";

export const getReviewsByMovie: RequestHandler = async (req, res) => {
    const filter = buildMovieFilter(req.params.id);

    if (!filter) {
        return res.status(400).json({ error: "Invalid movie id" });
    }

    try {
        const movie = await Movie.findOne(filter, { reviews: 1, averageRating: 1, title: 1 });

        if (!movie) {
            return res.status(404).json({ error: "Movie not found" });
        }

        return res.json({
            title: movie.title,
            averageRating: movie.averageRating,
            reviews: Array.isArray(movie.reviews) ? movie.reviews : [],
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
        ? (req.body as Record<string, unknown>)
        : {};
    const ratingValue = Number((body as { rating?: unknown }).rating);

    if (!Number.isFinite(ratingValue) || ratingValue < 0 || ratingValue > 5) {
        return res.status(400).json({ error: "Rating must be a number between 0 and 5" });
    }

    try {
        const movie = await Movie.findOne(filter);

        if (!movie) {
            return res.status(404).json({ error: "Movie not found" });
        }

        const reviews = Array.isArray(movie.reviews) ? movie.reviews : [];
        const reviewPayload = {
            ...body,
            rating: ratingValue,
            createdAt: new Date().toISOString(),
        };

        reviews.push(reviewPayload);
        movie.reviews = reviews;
        movie.averageRating = calculateAverageRating(reviews);

        await movie.save();

        return res.status(201).json({
            msg: "Review added successfully",
            averageRating: movie.averageRating,
            reviews,
        });
    } catch {
        return res.status(500).json({ error: "Unable to add review" });
    }
}

export const getReviewsByMovieAndReviewId: RequestHandler = async () => {

}

export const updateReviewsByMovieAndReviewId: RequestHandler = async (req, res) => {
    const filter = buildMovieFilter(req.params.id);

    if (!filter) {
        return res.status(400).json({ error: "Invalid movie id" });
    }

    const { update, error } = sanitizeMovieUpdate(req.body);

    if (error || !update) {
        return res.status(400).json({ error: error ?? "Invalid payload" });
    }

    try {
        const movie = await Movie.findOneAndUpdate(filter, update, {
            new: true,
            runValidators: true,
        });

        if (!movie) {
            return res.status(404).json({ error: "Movie not found" });
        }

        return res.json(movie);
    } catch {
        return res.status(500).json({ error: "Unable to update this comment" });
    }
};

export const deleteReviewsByMovieAndReviewId: RequestHandler = async (req, res) => {
    const filter = buildMovieFilter(req.params.id);

    if (!filter) {
        return res.status(400).json({ error: "Invalid movie id" });
    }

    try {
        const movie = await Movie.findOneAndDelete({
        });

        if (!movie) {
            return res.status(404).json({ error: "Movie not found" });
        }
        return res.json({ msg: "Comment deleted successfully" });
    } catch {
        return res.status(500).json({ error: "Unable to delete this comment" });
    }
};
