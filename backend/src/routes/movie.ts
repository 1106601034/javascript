import { Router } from 'express';
import {
    addMovie,
    getAllMovies,
    getMovieById,
    updateMovieById,
    deleteMovieById,
} from '../controllers/movieReview/movie.ts';

const movieRouter = Router();

movieRouter.post('/', addMovie);
movieRouter.get('/', getAllMovies);
movieRouter.get('/:id', getMovieById);
movieRouter.put('/:id', updateMovieById);
movieRouter.delete('/:id', deleteMovieById);

export default movieRouter;
