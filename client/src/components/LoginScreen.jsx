import { useState } from 'react';

const demoUsers = [
  { role: 'ADMIN', email: 'admin@college.edu', password: 'admin123' },
  { role: 'FACULTY', email: 'teacher@college.edu', password: 'teacher123' },
  { role: 'STUDENT', email: 'student@college.edu', password: 'student123' },
];

export default function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState('student@college.edu');
  const [password, setPassword] = useState('student123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await onLogin(email, password);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/80 shadow-soft md:grid md:grid-cols-2">
        <div className="bg-gradient-to-br from-indigo-600 via-violet-600 to-sky-500 p-8 text-white">
          <div className="mb-6 inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em]">EdTech SaaS</div>
          <h1 className="text-3xl font-bold">Student Performance & Credit-Based Promotion System</h1>
          <p className="mt-4 max-w-md text-indigo-100">
            Continuous performance tracking, early risk detection, and credit-driven promotion decisions.
          </p>

          <div className="mt-8 space-y-3">
            {demoUsers.map((user) => (
              <div key={user.role} className="rounded-xl border border-white/20 bg-white/5 p-3 text-sm backdrop-blur-sm">
                <div className="font-semibold">{user.role}</div>
                <div className="mt-1 text-indigo-100">{user.email}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-8">
          <h2 className="text-2xl font-semibold text-white">Welcome back</h2>
          <p className="mt-2 text-sm text-slate-400">Sign in to access your academic dashboard.</p>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="mb-2 block text-sm text-slate-300">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none ring-0 transition focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-300">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-indigo-500"
              />
            </div>

            {error && <div className="rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-200">{error}</div>}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-indigo-600 px-4 py-3 font-medium text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
