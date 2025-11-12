import type { RequestHandler } from "express";
import createError from "http-errors";

const pageNotFound: RequestHandler = (req, _res, next) => {
    const message = `Cannot ${req.method} ${req.originalUrl}`;
    next(createError(404, message));
};

export default pageNotFound;
