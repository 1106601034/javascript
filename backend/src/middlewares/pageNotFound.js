import createError from "http-errors";

const PageNotFound = (req, res, next) => {
    const message = `Cannot ${req.method} ${req.originalUrl}`;
    next(createError(404, message));
};

export default PageNotFound;
