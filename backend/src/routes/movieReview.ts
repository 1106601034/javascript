import { Router } from 'express';
import {
    addMovie,
    getAllMovies,
    getMovieById,
    updateMovieById,
    deleteMovieById,
    getReviewsByMovie,
    addReviewsByMovie,
} from '../controllers/movieReview/movieReview.ts';

const movieRouter = Router();

movieRouter.post('/', addMovie);
movieRouter.get('/', getAllMovies);
movieRouter.get('/:id', getMovieById);

movieRouter.put('/:id', updateMovieById);
movieRouter.delete('/:id', deleteMovieById);
movieRouter.get('/:id/reviews', getReviewsByMovie);
movieRouter.post('/:id/reviews', addReviewsByMovie);

export default movieRouter;
