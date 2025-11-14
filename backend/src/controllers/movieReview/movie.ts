import type { RequestHandler } from "express";
import { Movie } from "../../models/movie.ts";
import {
    normalizeTypes,
    buildMovieFilter,
    sanitizeMovieUpdate,
} from "./helper.ts";

export const addMovie: RequestHandler = async (req, res) => {
    const body = (typeof req.body === "object" && req.body !== null) ? req.body as Record<string, unknown> : {};
    const title = typeof body.title === "string" ? body.title.trim() : "";
    const description = typeof body.description === "string" ? body.description.trim() : "";
    const types = normalizeTypes(body.types);
    const legacyId = Number(body.legacyId);

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
        return res.status(201).json(movie);
    } catch {
        return res.status(400).json({ error: "Unable to add this movie" });
    }
};

export const getAllMovies: RequestHandler = async (_req, res) => {
    try {
        const movies = await Movie.find();
        return res.json(movies);
    } catch {
        return res.status(404).json({ nomoviesfound: "No movies found" });
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

        return res.json(movie);
    } catch {
        return res.status(500).json({ error: "Unable to fetch movie" });
    }
};

export const updateMovieById: RequestHandler = async (req, res) => {
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
        return res.status(400).json({ error: "Unable to update this movie" });
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

        return res.json({ msg: "Movie deleted successfully" });
    } catch {
        return res.status(500).json({ error: "Unable to delete this movie" });
    }
};
