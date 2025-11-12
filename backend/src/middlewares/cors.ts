import type { RequestHandler } from "express";

const corsMiddleware: RequestHandler = (_req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    next();
};

export default corsMiddleware;
