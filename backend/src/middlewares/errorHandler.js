const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    const status = err.status || err.statusCode || 500;
    const payload = {
        success: false,
        message: err.message || "Internal Server Error",
    };

    res.status(status).json(payload);
};

export default errorHandler;
