import type { ErrorRequestHandler } from "express";
import type { HttpError } from "http-errors";

type SerializableError = Partial<HttpError> & Error & { statusCode?: number };

const errorHandler: ErrorRequestHandler = (err: SerializableError, _req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    const status = err.status ?? err.statusCode ?? 500;
    const payload = {
        success: false,
        message: err.message ?? "Internal Server Error",
    };

    res.status(status).json(payload);
};

export default errorHandler;
