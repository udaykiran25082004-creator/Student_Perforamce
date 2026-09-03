import express from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import { calculateRiskLevel, evaluatePromotion } from '../utils/academicEngine.js';

const router = express.Router();

const dashboardData = {
  admin: {
    totalStudents: 245,
    totalFaculty: 18,
    totalDepartments: 3,
    promotionRate: 84,
    averageCGPA: 7.6,
    averageAttendance: 86,
    studentsAtRisk: 19,
    totalCreditsEarned: 1640,
    departmentPerformance: [
      { name: 'CSE', value: 88 },
      { name: 'ECE', value: 82 },
      { name: 'ME', value: 76 },
    ],
    alerts: ['3 students have not met minimum attendance', '2 departments need curriculum review'],
  },
  faculty: {
    totalStudents: 64,
    averageClassPerformance: 72,
    studentsAtRisk: 9,
    passPercentage: 78,
    averageAttendance: 81,
    creditsCompleted: 94,
    subjectPerformance: [
      { subject: 'DBMS', value: 78 },
      { subject: 'OS', value: 74 },
      { subject: 'CN', value: 68 },
    ],
  },
  student: {
    studentName: 'Meher Khan',
    academicYear: '2026-27',
    semester: 7,
    department: 'CSE',
    requiredCredits: 20,
    earnedCredits: 18,
    remainingCredits: 2,
    cgpa: 7.8,
    attendance: 82,
    promotionStatus: 'NOT ELIGIBLE',
    riskLevel: 'MEDIUM',
    subjectWise: [
      { name: 'DBMS', score: 81 },
      { name: 'OS', score: 76 },
      { name: 'CN', score: 67 },
      { name: 'Algorithms', score: 88 },
    ],
    trend: [62, 68, 74, 72, 80, 77],
    preExam: 66,
    mainExam: 71,
    postExam: 76,
  },
};

router.get('/admin', authenticate, authorize('ADMIN'), (req, res) => {
  res.json(dashboardData.admin);
});

router.get('/faculty', authenticate, authorize('FACULTY'), (req, res) => {
  res.json(dashboardData.faculty);
});

router.get('/student', authenticate, authorize('STUDENT'), (req, res) => {
  const { earnedCredits, requiredCredits, attendance, failedSubjects, cgpa } = dashboardData.student;

  const risk = calculateRiskLevel({
    credits: earnedCredits,
    requiredCredits,
    failedSubjects: failedSubjects || 1,
    attendance,
    avgPerformance: 73,
    previousSemesterPerformance: 68,
  });

  const promotion = evaluatePromotion({
    earnedCredits,
    requiredCredits,
    attendance,
    failedSubjects: failedSubjects || 1,
    cgpa,
    minAttendance: 75,
    maxFailedSubjects: 2,
    minCgpa: 2.0,
  });

  res.json({
    ...dashboardData.student,
    riskLevel: risk,
    promotionStatus: promotion.status,
    recommendation: promotion.recommendation,
    reasons: promotion.reasons,
  });
});

export default router;
