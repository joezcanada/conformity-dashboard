import { Request, Response, NextFunction } from 'express';
import { InternalServerError } from '../errors/InternalServerError';
import { logger } from '../services/logger';

export const internalErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof InternalServerError) {
        logger.error(err.message, 'error');
        res.status(500).json({ error: err.message });
        return;
    }
    next(err);
};