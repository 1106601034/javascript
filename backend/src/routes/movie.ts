import { Router } from 'express';
import {
    addMovie,
    getAllMovies,
    getMovieById,
    updateMovieById,
    deleteMovieById,
} from '../controllers/movieReview/movie.ts';

const router = Router();

router.post('/', addMovie);
router.get('/', getAllMovies);
router.get('/:id', getMovieById);
router.put('/:id', updateMovieById);
router.delete('/:id', deleteMovieById);

export default router;
