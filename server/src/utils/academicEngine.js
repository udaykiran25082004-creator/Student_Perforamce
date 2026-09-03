export const calculatePercentage = (obtained, total) => {
  if (!total || total <= 0) return 0;
  return Number(((obtained / total) * 100).toFixed(2));
};

export const calculateGrade = (percentage) => {
  if (percentage >= 90) return 'A+';
  if (percentage >= 80) return 'A';
  if (percentage >= 70) return 'B+';
  if (percentage >= 60) return 'B';
  if (percentage >= 50) return 'C';
  if (percentage >= 40) return 'D';
  return 'F';
};

export const calculateAttendance = (present, total) => {
  if (!total || total <= 0) return 0;
  return Number(((present / total) * 100).toFixed(2));
};

export const calculateCGPA = (grades = []) => {
  const points = {
    'A+': 4.0,
    A: 3.7,
    'B+': 3.3,
    B: 3.0,
    C: 2.5,
    D: 2.0,
    F: 0,
  };

  if (!grades.length) return 0;
  const total = grades.reduce((sum, grade) => sum + (points[grade] || 0), 0);
  return Number((total / grades.length).toFixed(2));
};

export const calculateCredits = (subjects = []) => {
  return subjects.reduce((sum, subject) => {
    if (!subject || !subject.earned) return sum;
    return sum + (subject.credits || 0);
  }, 0);
};

export const calculateRiskLevel = ({
  credits,
  requiredCredits,
  failedSubjects,
  attendance,
  avgPerformance,
  previousSemesterPerformance,
}) => {
  const shortfall = Math.max(requiredCredits - credits, 0);
  const riskScore =
    (shortfall > 0 ? shortfall * 12 : 0) +
    (failedSubjects || 0) * 15 +
    (attendance < 75 ? (75 - attendance) * 1.3 : 0) +
    (avgPerformance < 50 ? (50 - avgPerformance) * 1.1 : 0) +
    (previousSemesterPerformance && previousSemesterPerformance < 60 ? (60 - previousSemesterPerformance) * 0.6 : 0);

  if (riskScore >= 70 || failedSubjects >= 4 || attendance < 60) return 'CRITICAL';
  if (riskScore >= 45 || shortfall >= 5 || failedSubjects >= 2) return 'HIGH';
  if (riskScore >= 20 || attendance < 75 || avgPerformance < 60) return 'MEDIUM';
  return 'LOW';
};

export const evaluatePromotion = ({
  earnedCredits,
  requiredCredits,
  attendance,
  failedSubjects,
  minAttendance = 75,
  maxFailedSubjects = 2,
  cgpa = 0,
  minCgpa = 2.0,
}) => {
  const eligible =
    earnedCredits >= requiredCredits &&
    attendance >= minAttendance &&
    failedSubjects <= maxFailedSubjects &&
    cgpa >= minCgpa;

  const shortfall = Math.max(requiredCredits - earnedCredits, 0);

  let status = eligible ? 'PROMOTED' : 'NOT ELIGIBLE';
  const reasons = [];

  if (earnedCredits < requiredCredits) reasons.push('Insufficient credits');
  if (attendance < minAttendance) reasons.push('Attendance below threshold');
  if (failedSubjects > maxFailedSubjects) reasons.push('Failed subjects exceed limit');
  if (cgpa < minCgpa) reasons.push('CGPA below minimum requirement');

  return {
    eligible,
    status,
    shortfall,
    reasons: reasons.length ? reasons : ['Meets academic requirements'],
    recommendation: eligible
      ? 'Proceed to the next academic year.'
      : shortfall > 0
        ? 'Complete pending credits and reattempt required assessments.'
        : 'Consult academic advisor to improve performance.',
  };
};
