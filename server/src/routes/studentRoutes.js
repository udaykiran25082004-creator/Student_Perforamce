import express from 'express';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

const studentRecords = [
  {
    id: 'S-2024-001',
    studentName: 'Meher Khan',
    department: 'CSE',
    year: 3,
    semester: 7,
    email: 'student@college.edu',
    cgpa: 7.8,
    attendance: 82,
    requiredCredits: 20,
    earnedCredits: 18,
    remainingCredits: 2,
    status: 'NOT ELIGIBLE',
    riskLevel: 'MEDIUM',
  },
  {
    id: 'S-2024-002',
    studentName: 'Aarav Verma',
    department: 'ECE',
    year: 2,
    semester: 4,
    email: 'aarav@college.edu',
    cgpa: 8.4,
    attendance: 88,
    requiredCredits: 20,
    earnedCredits: 21,
    remainingCredits: 0,
    status: 'PROMOTED',
    riskLevel: 'LOW',
  },
];

router.get('/', authenticate, authorize('ADMIN', 'FACULTY'), (req, res) => {
  res.json(studentRecords);
});

router.get('/:id', authenticate, (req, res) => {
  const student = studentRecords.find((item) => item.id === req.params.id);
  if (!student) return res.status(404).json({ message: 'Student not found' });

  res.json(student);
});

export default router;
