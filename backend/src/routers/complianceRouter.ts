import { Router } from 'express';
import { getComplianceMetrics } from '../controllers/complianceController';

const router = Router();

router.get('/compliance-metrics', getComplianceMetrics);

export default router;