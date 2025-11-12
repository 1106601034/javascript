import type { RequestHandler } from "express";
import { Movie } from "../../models/movie.ts";

export const addMovie: RequestHandler = async (req, res) => {
    try {
        await Movie.create(req.body);
        res.json({ msg: "Book added successfully" });
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

export const getMovieById: RequestHandler = (_req, _res, _next) => { };
export const updateMovieById: RequestHandler = (_req, _res, _next) => { };
export const deleteMovieById: RequestHandler = (_req, _res, _next) => { };
export const getReviewsByMovie: RequestHandler = (_req, _res, _next) => { };
export const addReviewsByMovie: RequestHandler = (_req, _res, _next) => { };
