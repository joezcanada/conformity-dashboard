import { NextFunction, Request, Response } from 'express';
import { getRandomMetrics } from '../services/metricsService';
import { logger } from '../services/logger';
import { BadRequestError } from '../errors/badRequestError';

export const getComplianceMetrics = (req: Request, res: Response, next: NextFunction) => {
    const { startDate: startDateQuery, endDate: endDateQuery } = req.query;

    try {
        const startDate = startDateQuery ? new Date(startDateQuery as string) : new Date(Date.now() - 9 * 24 * 60 * 60 * 1000);
        const endDate = endDateQuery ? new Date(endDateQuery as string) : new Date();

        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            logger.warn('Date range is not valid', {
                startDate: startDate,
                endDate: endDate
            });
            throw new BadRequestError('Invalid start date or end date');
        }

        const metrics = getRandomMetrics(startDate, endDate);

        logger.info('Compliance metrics retrieved successfully', {
            startDate: startDate,
            endDate: endDate
        });
        res.json(metrics);
    } catch (error) {
        next(error);
    }
};
