import movieRouter from "./movie.ts";
import {
    getReviewsByMovie,
    addReviewsByMovie,
    // updateReviewsByMovie,
    // deleteReviewsByMovie,
} from "../controllers/movieReview/review.ts";

movieRouter.get('/:id/reviews', getReviewsByMovie);
movieRouter.post('/:id/reviews', addReviewsByMovie);
// movieRouter.put('/:id/reviews', updateReviewsByMovie);
// movieRouter.delete('/:id/reviews', deleteReviewsByMovie);

export default movieRouter;