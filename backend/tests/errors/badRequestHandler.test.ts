import request from 'supertest';
import app from '../../src/index';

describe('badRequestHandler', () => {
    test('should return 200 on valid request', async () => {
        const response = await request(app).get('/api/v1/compliance-metrics'); // Adjust endpoint
        expect(response.status).toBe(200);
    });

    test('should handle invalid request', async () => {
        const response = await request(app).get('/api/v1/invalid-endpoint'); // Adjust endpoint
        expect(response.status).toBe(404);
    });
});
