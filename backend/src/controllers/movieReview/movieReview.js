import { Router } from "express";
import Movie from "../../models/movie.js";
import Review from "../../models/review.js";

const router = Router();

export const addMovie = (req, res, next) => {
    Movie.create(req.body)
        .then((movie) => res.json({ msg: "Book added successfully" }))
        .catch((err) => res.status(400).json({ error: "Unable to add this movie" }));
};
export const getAllMovies = (req, res, next) => { };
export const getMovieById = (req, res, next) => { };
export const updateMovieById = (req, res, next) => { };
export const deleteMovieById = (req, res, next) => { };
export const getReviewsByMovie = (req, res, next) => { };
export const addReviewsByMovie = (req, res, next) => { };
