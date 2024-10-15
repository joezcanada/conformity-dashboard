import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../errors/badRequestError";
import { logger } from "../services/logger";

export const badRequestHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof BadRequestError) {
        logger.warn(err.message, 'error');
        res.status(400).json({ error: err.message });
        return;
    }
    next(err);
};
