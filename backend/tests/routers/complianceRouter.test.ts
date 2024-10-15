import request from 'supertest';
import express, { Router } from 'express';
import complianceRouter from '../../src/routers/complianceRouter'; 
import { getComplianceMetrics } from '../../src/controllers/complianceController'; 

jest.mock('../../src/controllers/complianceController', () => ({
  getComplianceMetrics: jest.fn((req, res) => res.status(200).json({ message: 'Success' })),
}));

describe('Compliance Router', () => {
  let app: express.Application;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.use('/api/v1', complianceRouter); 
  });

  test('GET /compliance-metrics should call getComplianceMetrics and return 200', async () => {
    const response = await request(app).get('/api/v1/compliance-metrics');
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Success' });
    expect(getComplianceMetrics).toHaveBeenCalled();
  });

  test('GET /compliance-metrics should handle errors', async () => {
    (getComplianceMetrics as jest.Mock).mockImplementationOnce((req, res) => res.status(500).json({ error: 'Internal server error' }));
    
    const response = await request(app).get('/api/v1/compliance-metrics');
    
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Internal server error' });
  });
});

