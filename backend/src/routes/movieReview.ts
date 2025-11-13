import { Router } from 'express';
import {
    addMovie,
    getAllMovies,
    getMovieById,
    updateMovieById,
    deleteMovieById,
    getReviewsByMovie,
    addReviewsByMovie,
    // updateReviewsByMovie,
    // deleteReviewsByMovie,
} from '../controllers/movieReview/movieReview.js';

const movieRouter = Router();

movieRouter.post('/', addMovie);
movieRouter.get('/', getAllMovies);

movieRouter.get('/:id', getMovieById);
movieRouter.put('/:id', updateMovieById);
movieRouter.delete('/:id', deleteMovieById);

movieRouter.get('/:id/reviews', getReviewsByMovie);
movieRouter.post('/:id/reviews', addReviewsByMovie);
// movieRouter.put('/:id/reviews', updateReviewsByMovie);
// movieRouter.delete('/:id/reviews', deleteReviewsByMovie);

export default movieRouter;
