import type { RequestHandler } from "express";
import type { FilterQuery } from "mongoose";
import { isValidObjectId } from "mongoose";
import { Movie } from "../../models/movie.js";
import type { MovieDocument } from "../../models/movie.js";

type MovieFilter = FilterQuery<MovieDocument>;

const normalizeTypes = (rawTypes: unknown): string[] => {
    if (!Array.isArray(rawTypes)) {
        return [];
    }

    return rawTypes
        .map((value) => typeof value === "string" ? value.trim() : "")
        .filter((value) => value.length > 0);
};

const buildMovieFilter = (rawId?: string): MovieFilter | null => {
    if (!rawId) {
        return null;
    }

    if (isValidObjectId(rawId)) {
        return { _id: rawId };
    }

    const numericId = Number(rawId);
    if (Number.isFinite(numericId)) {
        return { legacyId: numericId };
    }

    return null;
};

const calculateAverageRating = (reviews: MovieDocument["reviews"]): number => {
    const reviewList = Array.isArray(reviews) ? reviews : [];

    const ratings = reviewList
        .map((review) => {
            if (typeof review === "number") {
                return review;
            }

            if (review && typeof review === "object" && "rating" in review) {
                const value = Number((review as { rating?: unknown }).rating);
                return Number.isFinite(value) ? value : NaN;
            }

            return NaN;
        })
        .filter((value): value is number => Number.isFinite(value));

    if (ratings.length === 0) {
        return 0;
    }

    const total = ratings.reduce((sum, value) => sum + value, 0);
    return Number((total / ratings.length).toFixed(2));
};

export const addMovie: RequestHandler = async (req, res) => {
    const body = (typeof req.body === "object" && req.body !== null) ? req.body as Record<string, unknown> : {};
    const title = typeof body.title === "string" ? body.title.trim() : "";
    const description = typeof body.description === "string" ? body.description.trim() : "";
    const types = normalizeTypes(body.types);
    const legacyId = Number(body.legacyId ?? body.id);

    if (!title || !description || types.length === 0) {
        return res.status(400).json({
            message: "All fields are required and types must be a non-empty array",
        });
    }

    const moviePayload: Record<string, unknown> = {
        title,
        description,
        types,
    };

    if (Number.isFinite(legacyId)) {
        moviePayload.legacyId = legacyId;
    }

    try {
        const movie = await Movie.create(moviePayload);
        res.status(201).json(movie);
    } catch {
        res.status(400).json({ error: "Unable to add this movie" });
    }
};

export const getAllMovies: RequestHandler = async (_req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch {
        res.status(404).json({ nomoviesfound: "No movies found" });
    }
};

export const getMovieById: RequestHandler = async (req, res) => {
    const filter = buildMovieFilter(req.params.id);

    if (!filter) {
        return res.status(400).json({ error: "Invalid movie id" });
    }

    try {
        const movie = await Movie.findOne(filter);

        if (!movie) {
            return res.status(404).json({ error: "Movie not found" });
        }

        res.json(movie);
    } catch {
        res.status(500).json({ error: "Unable to fetch movie" });
    }
};

export const updateMovieById: RequestHandler = async (req, res) => {
    const filter = buildMovieFilter(req.params.id);

    if (!filter) {
        return res.status(400).json({ error: "Invalid movie id" });
    }

    try {
        const movie = await Movie.findOneAndUpdate(filter, req.body, {
            new: true,
            runValidators: true,
        });

        if (!movie) {
            return res.status(404).json({ error: "Movie not found" });
        }

        res.json(movie);
    } catch {
        res.status(400).json({ error: "Unable to update this movie" });
    }
};

export const deleteMovieById: RequestHandler = async (req, res) => {
    const filter = buildMovieFilter(req.params.id);

    if (!filter) {
        return res.status(400).json({ error: "Invalid movie id" });
    }

    try {
        const movie = await Movie.findOneAndDelete(filter);

        if (!movie) {
            return res.status(404).json({ error: "Movie not found" });
        }

        res.json({ msg: "Movie deleted successfully" });
    } catch {
        res.status(500).json({ error: "Unable to delete this movie" });
    }
};

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

        res.json({
            title: movie.title,
            averageRating: movie.averageRating,
            reviews: Array.isArray(movie.reviews) ? movie.reviews : [],
        });
    } catch {
        res.status(500).json({ error: "Unable to fetch reviews" });
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

        res.status(201).json({
            msg: "Review added successfully",
            averageRating: movie.averageRating,
            reviews,
        });
    } catch {
        res.status(500).json({ error: "Unable to add review" });
    }
};
