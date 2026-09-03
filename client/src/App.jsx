import { useEffect, useMemo, useState } from 'react';
import { BarChart3, BookOpen, GraduationCap, ShieldCheck, Bell, Users, TrendingUp, LogOut } from 'lucide-react';
import API from './api';
import StatCard from './components/StatCard';
import DashboardLayout from './components/DashboardLayout';
import LoginScreen from './components/LoginScreen';

const roleColors = {
  ADMIN: 'bg-violet-500/15 text-violet-200 border-violet-500/40',
  FACULTY: 'bg-sky-500/15 text-sky-200 border-sky-500/40',
  STUDENT: 'bg-emerald-500/15 text-emerald-200 border-emerald-500/40',
};

const demoMode = import.meta.env.PROD && !import.meta.env.VITE_API_URL;

const demoUsers = {
  'admin@college.edu': { id: 'demo-admin', name: 'Demo Admin', role: 'ADMIN', password: 'admin123' },
  'teacher@college.edu': { id: 'demo-faculty', name: 'Demo Faculty', role: 'FACULTY', password: 'teacher123' },
  'student@college.edu': { id: 'demo-student', name: 'Meher Khan', role: 'STUDENT', password: 'student123' },
};

const demoDashboards = {
  ADMIN: { totalStudents: 245, promotionRate: 84, averageCGPA: 7.6, studentsAtRisk: 19 },
  FACULTY: { totalStudents: 64, averageClassPerformance: 72, passPercentage: 78, creditsCompleted: 94 },
  STUDENT: {
    requiredCredits: 20,
    earnedCredits: 18,
    cgpa: 7.8,
    attendance: 82,
    promotionStatus: 'NOT ELIGIBLE',
    riskLevel: 'MEDIUM',
    trend: [62, 68, 74, 72, 80, 77],
    preExam: 66,
    mainExam: 71,
    postExam: 76,
  },
};

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    if (demoMode && token === 'demo-token') {
      setUser(JSON.parse(localStorage.getItem('demo-user')));
      setLoading(false);
      return;
    }

    API.get('/auth/me')
      .then(({ data }) => setUser(data))
      .catch(() => localStorage.removeItem('token'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!user) return;

    if (demoMode) {
      setDashboard(demoDashboards[user.role]);
      return;
    }

    const endpoint =
      user.role === 'ADMIN' ? '/dashboard/admin' :
      user.role === 'FACULTY' ? '/dashboard/faculty' :
      '/dashboard/student';

    API.get(endpoint)
      .then(({ data }) => setDashboard(data))
      .catch((error) => console.error('Dashboard fetch failed', error));
  }, [user]);

  const stats = useMemo(() => {
    if (!dashboard) return [];

    if (user?.role === 'ADMIN') {
      return [
        { label: 'Total Students', value: dashboard.totalStudents, icon: Users },
        { label: 'Promotion Rate', value: `${dashboard.promotionRate}%`, icon: TrendingUp },
        { label: 'Avg CGPA', value: dashboard.averageCGPA.toFixed(1), icon: GraduationCap },
        { label: 'Students at Risk', value: dashboard.studentsAtRisk, icon: Bell },
      ];
    }

    if (user?.role === 'FACULTY') {
      return [
        { label: 'Total Students', value: dashboard.totalStudents, icon: Users },
        { label: 'Class Avg', value: `${dashboard.averageClassPerformance}%`, icon: BarChart3 },
        { label: 'Pass %', value: `${dashboard.passPercentage}%`, icon: ShieldCheck },
        { label: 'Credits Completed', value: `${dashboard.creditsCompleted}%`, icon: BookOpen },
      ];
    }

    return [
      { label: 'Earned Credits', value: `${dashboard.earnedCredits}/${dashboard.requiredCredits}`, icon: BookOpen },
      { label: 'Attendance', value: `${dashboard.attendance}%`, icon: BarChart3 },
      { label: 'CGPA', value: dashboard.cgpa.toFixed(1), icon: GraduationCap },
      { label: 'Status', value: dashboard.promotionStatus, icon: ShieldCheck },
    ];
  }, [dashboard, user]);

  const handleLogin = async (email, password) => {
    if (demoMode) {
      const demoUser = demoUsers[email];
      if (!demoUser || demoUser.password !== password) {
        throw new Error('Invalid demo credentials');
      }

      const { password: _password, ...safeUser } = demoUser;
      localStorage.setItem('token', 'demo-token');
      localStorage.setItem('demo-user', JSON.stringify(safeUser));
      setUser(safeUser);
      return;
    }

    const { data } = await API.post('/auth/login', { email, password });
    localStorage.setItem('token', data.token);
    setUser(data.user);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('demo-user');
    setUser(null);
    setDashboard(null);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-100">
        <div className="h-14 w-14 animate-spin rounded-full border-4 border-indigo-500/20 border-t-indigo-500" />
      </div>
    );
  }

  if (!user) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="dashboard-shell bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-[1600px] px-4 py-4 sm:px-6 lg:px-8">
        <header className="mb-6 flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-soft md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Academic platform</p>
            <h1 className="mt-1 text-2xl font-bold text-white">Student Performance Portal</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className={`chip border ${roleColors[user.role]}`}>{user.role}</div>
            <div className="rounded-full border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-200">{user.name}</div>
            <button onClick={handleLogout} className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-100 transition hover:border-red-500/60 hover:text-red-300">
              <LogOut size={16} /> Logout
            </button>
          </div>
        </header>

        <section className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => (
            <StatCard key={item.label} label={item.label} value={item.value} Icon={item.icon} />
          ))}
        </section>

        <DashboardLayout user={user} dashboard={dashboard} />
      </div>
    </div>
  );
}

export default App;
