import { getComplianceMetrics } from '../../src/controllers/complianceController'; // Adjust path as necessary
import { Request, Response, NextFunction } from 'express';
import { getRandomMetrics } from '../../src/services/metricsService';
import { logger } from '../../src/services/logger';
import { BadRequestError } from '../../src/errors/badRequestError';

jest.mock('../../src/services/metricsService');
jest.mock('../../src/services/logger');

const mockRequest = (queryData: any = {}) => ({
    query: queryData,
} as unknown as Request);

const mockResponse = () => {
    const res = {} as Response;
    res.json = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    return res;
};

const mockNext = () => jest.fn();

describe('getComplianceMetrics', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should return metrics with default date range if no dates are provided', () => {
        const req = mockRequest();
        const res = mockResponse();
        const next = mockNext();

        const mockMetrics = { data: 'mocked-metrics' };
        (getRandomMetrics as jest.Mock).mockReturnValue(mockMetrics);

        getComplianceMetrics(req, res, next);

        expect(res.json).toHaveBeenCalledWith(mockMetrics);
        expect(getRandomMetrics).toHaveBeenCalled();
        expect(logger.info).toHaveBeenCalledWith(expect.stringContaining('Compliance metrics retrieved successfully'), expect.any(Object));
    });

    test('should throw BadRequestError if invalid start date is provided', () => {
        const req = mockRequest({ startDate: 'invalid-date' });
        const res = mockResponse();
        const next = mockNext();

        getComplianceMetrics(req, res, next);

        expect(next).toHaveBeenCalledWith(expect.any(BadRequestError));
        expect(logger.warn).toHaveBeenCalledWith(
            'Date range is not valid',
            expect.objectContaining({
                startDate: expect.any(Date),
                endDate: expect.any(Date),
            })
        );
    });

    test('should throw BadRequestError if invalid end date is provided', () => {
        const req = mockRequest({ endDate: 'invalid-date' });
        const res = mockResponse();
        const next = mockNext();

        getComplianceMetrics(req, res, next);

        expect(next).toHaveBeenCalledWith(expect.any(BadRequestError));
        expect(logger.warn).toHaveBeenCalledWith(
            'Date range is not valid',
            expect.objectContaining({
                startDate: expect.any(Date),
                endDate: expect.any(Date),
            })
        );
    });

    test('should use provided startDate and endDate', () => {
        const startDate = '2023-01-01';
        const endDate = '2023-01-10';
        const req = mockRequest({ startDate, endDate });
        const res = mockResponse();
        const next = mockNext();

        const mockMetrics = { data: 'mocked-metrics' };
        (getRandomMetrics as jest.Mock).mockReturnValue(mockMetrics);

        getComplianceMetrics(req, res, next);

        expect(getRandomMetrics).toHaveBeenCalledWith(new Date(startDate), new Date(endDate));
        expect(res.json).toHaveBeenCalledWith(mockMetrics);
    });
});
