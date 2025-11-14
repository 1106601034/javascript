import movieRouter from "./movie.js";
import {
    getReviewsByMovie,
    addReviewsByMovie,
    getReviewsByMovieAndReviewId,
    updateReviewsByMovieAndReviewId,
    deleteReviewsByMovieAndReviewId,
} from "../controllers/movieReview/review.js";

movieRouter.get('/:id/reviews', getReviewsByMovie);
movieRouter.post('/:id/reviews', addReviewsByMovie);
movieRouter.get('/:id/reviews/:reviewId', getReviewsByMovieAndReviewId);
movieRouter.put('/:id/reviews/:reviewId', updateReviewsByMovieAndReviewId);
movieRouter.delete('/:id/reviews/:reviewId', deleteReviewsByMovieAndReviewId);

export default movieRouter;