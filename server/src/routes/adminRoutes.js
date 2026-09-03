import express from 'express';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

const promotionRules = {
  minimumCredits: 20,
  minimumAttendance: 75,
  minimumPassPercentage: 40,
  maximumFailedSubjects: 2,
  gradeSystem: ['A+', 'A', 'B+', 'B', 'C', 'D', 'F'],
  promotionRules: ['Earned Credits >= Required Credits', 'Attendance >= Minimum Attendance', 'Failed Subjects <= Maximum Allowed'],
};

router.get('/settings', authenticate, authorize('ADMIN'), (req, res) => {
  res.json(promotionRules);
});

router.put('/settings', authenticate, authorize('ADMIN'), (req, res) => {
  Object.assign(promotionRules, req.body);
  res.json({ message: 'Promotion settings updated', data: promotionRules });
});

export default router;
