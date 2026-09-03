import express from 'express';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

const reportSamples = {
  studentPerformance: {
    student: 'Meher Khan',
    currentCgpa: 7.8,
    promotionDecision: 'NOT ELIGIBLE',
    summary: 'Shortfall: 2 credits; attendance below minimum threshold.',
  },
  department: {
    department: 'CSE',
    passRate: 82,
    avgCgpa: 7.5,
    studentsAtRisk: 12,
  },
  promotion: {
    totalStudents: 245,
    promoted: 206,
    notPromoted: 39,
    rate: 84,
  },
};

router.get('/student/:id', authenticate, authorize('ADMIN', 'FACULTY', 'STUDENT'), (req, res) => {
  res.json(reportSamples.studentPerformance);
});

router.get('/department', authenticate, authorize('ADMIN', 'FACULTY'), (req, res) => {
  res.json(reportSamples.department);
});

router.get('/promotion', authenticate, authorize('ADMIN', 'FACULTY'), (req, res) => {
  res.json(reportSamples.promotion);
});

export default router;
