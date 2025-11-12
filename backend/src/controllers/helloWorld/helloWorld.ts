import type { Request, Response } from "express";

const greeting = (_req: Request, res: Response): void => {
    res.send("Hello World!");
};

export default greeting;
