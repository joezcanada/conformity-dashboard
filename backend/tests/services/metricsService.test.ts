// getRandomMetrics.test.ts
import { getRandomMetrics } from '../../src/services/metricsService';  // Adjust the import path

describe('getRandomMetrics', () => {
    const mockRandom = (value: number) => {
        jest.spyOn(Math, 'random').mockReturnValue(value);
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should generate random compliance metrics', () => {
        const startDate = new Date('2023-01-01');
        const endDate = new Date('2023-01-10');

        mockRandom(0.5);

        const metrics = getRandomMetrics(startDate, endDate);

        expect(metrics.complianceScore).toBe(85); 
        expect(metrics.controlsImplemented).toBe(75);
        expect(metrics.pendingTasks).toBe(25); 
        expect(metrics.metricsHistory.length).toBe(10);

        expect(metrics.metricsHistory[0]).toEqual({
            date: '2023-01-01',
            score: 85,
            control: 75,
            pending: 10,
        });

        expect(metrics.metricsHistory[9].date).toBe('2023-01-10');
    });

    test('should handle single-day ranges', () => {
        const startDate = new Date('2023-01-01');
        const endDate = new Date('2023-01-01'); 

        mockRandom(0.5);

        const metrics = getRandomMetrics(startDate, endDate);

        expect(metrics.metricsHistory.length).toBe(1);
        expect(metrics.metricsHistory[0].date).toBe('2023-01-01');
    });
});
