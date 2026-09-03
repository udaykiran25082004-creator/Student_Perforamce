import { useState } from 'react';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Area, AreaChart } from 'recharts';
import { AlertTriangle, ArrowUpRight, BookOpen, ShieldCheck, Target, UserCheck } from 'lucide-react';

const palette = ['#4f46e5', '#22c55e', '#f59e0b', '#ef4444', '#38bdf8'];

function SectionCard({ title, children, action }) {
  return (
    <div className="card p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        {action}
      </div>
      {children}
    </div>
  );
}

function ExamPaper({ examType, questions, accentClass }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const answeredCount = Object.keys(answers).length;

  function submitExam(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <form onSubmit={submitExam} className="space-y-6">
      <div className={`rounded-2xl border p-5 ${accentClass}`}>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.22em] text-slate-400">Student examination portal</div>
            <h2 className="mt-2 text-2xl font-bold text-white">{examType} Examination</h2>
            <p className="mt-1 text-sm text-slate-300">Answer all questions. Your responses are saved for this attempt.</p>
          </div>
          <div className="rounded-xl border border-slate-700 bg-slate-950/60 px-4 py-3 text-right">
            <div className="text-xs uppercase tracking-[0.18em] text-slate-400">Progress</div>
            <div className="mt-1 text-lg font-semibold text-white">{answeredCount}/{questions.length} answered</div>
          </div>
        </div>
      </div>

      {questions.map((question, questionIndex) => (
        <section key={question.id} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
          <div className="flex gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-800 text-sm font-semibold text-slate-200">{questionIndex + 1}</span>
            <div className="min-w-0 flex-1">
              <h3 className="text-base font-semibold leading-6 text-white">{question.prompt}</h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {question.options.map((option) => (
                  <label key={option} className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 text-sm transition ${answers[question.id] === option ? 'border-indigo-400 bg-indigo-500/15 text-white' : 'border-slate-700 text-slate-300 hover:border-slate-500'}`}>
                    <input
                      type="radio"
                      name={question.id}
                      value={option}
                      checked={answers[question.id] === option}
                      onChange={() => setAnswers((current) => ({ ...current, [question.id]: option }))}
                      className="accent-indigo-500"
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
        <p className="text-sm text-slate-400">{submitted ? 'Exam submitted successfully. Faculty can now review your attempt.' : 'Review your answers before submitting.'}</p>
        <button type="submit" className="rounded-xl bg-indigo-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-50" disabled={answeredCount !== questions.length || submitted}>
          {submitted ? 'Submitted' : 'Submit exam'}
        </button>
      </div>
    </form>
  );
}

export default function DashboardLayout({ user, dashboard }) {
  if (!dashboard) return null;

  const isAdmin = user.role === 'ADMIN';
  const isFaculty = user.role === 'FACULTY';

  const adminChartData = [
    { name: 'CSE', promotion: 88, risk: 12 },
    { name: 'ECE', promotion: 81, risk: 16 },
    { name: 'ME', promotion: 75, risk: 22 },
  ];

  const studentSubjectData = [
    { subject: 'DBMS', score: 82 },
    { subject: 'OS', score: 74 },
    { subject: 'CN', score: 68 },
    { subject: 'AI', score: 90 },
  ];

  const creditCompletion = [
    { name: 'Earned', value: dashboard.earnedCredits || 18 },
    { name: 'Remaining', value: Math.max((dashboard.requiredCredits || 20) - (dashboard.earnedCredits || 18), 0) },
  ];

  const trendData = dashboard.trend || [62, 68, 71, 74, 78, 80];

  const riskData = [
    { name: 'Low', value: 25 },
    { name: 'Medium', value: 35 },
    { name: 'High', value: 25 },
    { name: 'Critical', value: 15 },
  ];

  const examTabs = ['Overview', 'Pre Exam', 'Main Exam', 'Post Exam'];
  const [examTab, setExamTab] = useState('Overview');

  const preExamRows = [
    { label: 'Quiz marks', value: '82%' },
    { label: 'Assignment marks', value: '76%' },
    { label: 'Internal assessment', value: '88%' },
    { label: 'Class test', value: '70%' },
    { label: 'Attendance', value: '84%' },
    { label: 'Practical assessment', value: '79%' },
  ];

  const postExamRows = [
    { label: 'Retest', value: '73%' },
    { label: 'Remedial assessment', value: '69%' },
    { label: 'Practical', value: '81%' },
    { label: 'Project', value: '88%' },
    { label: 'Viva', value: '90%' },
    { label: 'Improvement exam', value: '77%' },
  ];

  const preExamQuestions = [
    { id: 'pre-1', prompt: 'Which data structure follows the First In, First Out principle?', options: ['Stack', 'Queue', 'Tree', 'Graph'] },
    { id: 'pre-2', prompt: 'What does DBMS primarily help manage?', options: ['Computer hardware', 'Database information', 'Network cables', 'Operating system files'] },
    { id: 'pre-3', prompt: 'Which layer handles routing in the OSI model?', options: ['Physical', 'Transport', 'Network', 'Application'] },
    { id: 'pre-4', prompt: 'What is the main purpose of an algorithm?', options: ['Store electricity', 'Solve a problem step by step', 'Design a screen', 'Compress a monitor'] },
  ];

  const postExamQuestions = [
    { id: 'post-1', prompt: 'Which SQL command is used to retrieve records from a table?', options: ['SELECT', 'PUSH', 'FETCHFILE', 'DISPLAY'] },
    { id: 'post-2', prompt: 'Which scheduling method gives each process a fixed time slice?', options: ['Round Robin', 'Depth First', 'Priority Stack', 'Binary Search'] },
    { id: 'post-3', prompt: 'A primary key in a relational table must be:', options: ['Duplicated', 'Unique', 'Always text', 'Always negative'] },
    { id: 'post-4', prompt: 'Which metric represents the percentage of classes attended?', options: ['GPA', 'Credit load', 'Attendance rate', 'Promotion index'] },
  ];

  if (isAdmin) {
    return (
      <div className="space-y-6">
        <div className="grid gap-6 xl:grid-cols-3">
          <SectionCard title="Department performance" className="xl:col-span-2">
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={adminChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="name" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip />
                  <Bar dataKey="promotion" fill="#4f46e5" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="risk" fill="#22c55e" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </SectionCard>

          <SectionCard title="Academic risk overview">
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={riskData} dataKey="value" nameKey="name" innerRadius={52} outerRadius={82} paddingAngle={3}>
                    {riskData.map((entry, index) => (
                      <Cell key={entry.name} fill={palette[index % palette.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </SectionCard>
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <SectionCard title="Promotion trend">
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={[{ term: 'Sem 1', rate: 72 }, { term: 'Sem 2', rate: 76 }, { term: 'Sem 3', rate: 81 }, { term: 'Sem 4', rate: 84 }, { term: 'Sem 5', rate: 86 }] }>
                  <defs>
                    <linearGradient id="promoFill" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="term" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip />
                  <Area type="monotone" dataKey="rate" stroke="#8b5cf6" fill="url(#promoFill)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </SectionCard>

          <SectionCard title="Institution alerts">
            <div className="space-y-3">
              {['3 students have below-threshold attendance', '2 departments need intervention support', '12 records require review before final promotion decision'].map((alert, index) => (
                <div key={index} className="flex items-start gap-3 rounded-xl border border-slate-800 bg-slate-950/70 p-3">
                  <AlertTriangle className="mt-1 text-amber-400" size={18} />
                  <span className="text-sm text-slate-300">{alert}</span>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      </div>
    );
  }

  if (isFaculty) {
    return (
      <div className="space-y-6">
        <div className="grid gap-6 xl:grid-cols-2">
          <SectionCard title="Class performance">
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={studentSubjectData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="subject" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip />
                  <Bar dataKey="score" fill="#22c55e" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </SectionCard>

          <SectionCard title="Grade distribution">
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={[{ name: 'A', value: 18 }, { name: 'B', value: 30 }, { name: 'C', value: 22 }, { name: 'F', value: 10 }]} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90}>
                    {palette.map((entry, index) => <Cell key={index} fill={entry} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </SectionCard>
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <SectionCard title="Attendance overview">
            <div className="space-y-4">
              {['DBMS', 'Operating Systems', 'Data Structures'].map((subject, idx) => (
                <div key={subject}>
                  <div className="mb-1 flex justify-between text-sm text-slate-300">
                    <span>{subject}</span>
                    <span>{80 + idx * 5}%</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-slate-800">
                    <div className="h-full rounded-full bg-indigo-500" style={{ width: `${80 + idx * 5}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Priority students">
            <div className="space-y-3">
              {['Aisha Noor', 'Kabir Singh', 'Naina Reddy'].map((student, idx) => (
                <div key={student} className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/70 p-3">
                  <div>
                    <div className="font-medium text-white">{student}</div>
                    <div className="text-sm text-slate-400">Risk {idx === 0 ? 'High' : idx === 1 ? 'Medium' : 'Low'}</div>
                  </div>
                  <div className={`chip ${idx === 0 ? 'border-red-500/40 bg-red-500/10 text-red-200' : idx === 1 ? 'border-amber-500/40 bg-amber-500/10 text-amber-200' : 'border-emerald-500/40 bg-emerald-500/10 text-emerald-200'}`}>
                    {idx === 0 ? 'Review' : idx === 1 ? 'Monitor' : 'Stable'}
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="mb-4 flex flex-wrap gap-2">
        {examTabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setExamTab(tab)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
              examTab === tab
                ? 'border-indigo-500 bg-indigo-500/15 text-indigo-100'
                : 'border-slate-700 bg-slate-800 text-slate-300 hover:border-slate-500'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {examTab === 'Overview' && (
        <>
          <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
            <SectionCard title="Academic workflow">
              <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-6">
                {['Enrollment', 'Pre-Exam', 'Main Exam', 'Post-Exam', 'Credit', 'Promotion'].map((step, idx) => (
                  <div key={step} className="rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-3 text-center">
                    <div className="mb-2 text-xs uppercase tracking-[0.2em] text-indigo-200">{idx + 1}</div>
                    <div className="text-sm font-medium text-white">{step}</div>
                  </div>
                ))}
              </div>
            </SectionCard>

            <SectionCard title="Promotion status">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Status</span>
                  <span className="chip border border-amber-500/40 bg-amber-500/10 text-amber-200">{dashboard.promotionStatus || 'NOT ELIGIBLE'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Credits</span>
                  <span className="font-semibold text-white">{dashboard.earnedCredits || 18} / {dashboard.requiredCredits || 20}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Remaining</span>
                  <span className="font-semibold text-white">{Math.max((dashboard.requiredCredits || 20) - (dashboard.earnedCredits || 18), 0)} credits</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Attendance</span>
                  <span className="font-semibold text-white">{dashboard.attendance || 82}%</span>
                </div>
              </div>
            </SectionCard>
          </div>

          <div className="grid gap-6 xl:grid-cols-3">
            <SectionCard title="Credit completion">
              <div className="flex items-center justify-center">
                <div className="h-60 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={creditCompletion} dataKey="value" innerRadius={55} outerRadius={90} paddingAngle={4}>
                        {creditCompletion.map((entry, index) => <Cell key={entry.name} fill={index === 0 ? '#4f46e5' : '#334155'} />)}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </SectionCard>

            <SectionCard title="Pre vs Main vs Post Exam">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[{ exam: 'Pre', value: dashboard.preExam || 66 }, { exam: 'Main', value: dashboard.mainExam || 71 }, { exam: 'Post', value: dashboard.postExam || 76 }]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="exam" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip />
                    <Bar dataKey="value" fill="#38bdf8" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </SectionCard>

            <SectionCard title="Academic risk">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-amber-300">
                  <AlertTriangle size={18} />
                  <span className="font-semibold">{dashboard.riskLevel || 'MEDIUM'} RISK</span>
                </div>
                <p className="text-sm text-slate-300">Current performance indicates the student may fall short of the required credits. Immediate academic intervention is recommended.</p>
                <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3">
                  <div className="text-xs uppercase tracking-[0.22em] text-slate-400">Recommendation</div>
                  <div className="mt-2 text-sm text-slate-200">Complete pending subjects, improve attendance, and prepare for supplementary examination.</div>
                </div>
              </div>
            </SectionCard>
          </div>
        </>
      )}

      {examTab === 'Pre Exam' && (
        <ExamPaper examType="Pre" questions={preExamQuestions} accentClass="border-indigo-500/30 bg-indigo-500/5" />
      )}

      {examTab === 'Main Exam' && (
        <div className="grid gap-6 xl:grid-cols-2">
          <SectionCard title="Main Examination">
            <div className="space-y-3">
              <div className="rounded-xl border border-violet-500/20 bg-violet-500/5 p-3 text-sm text-violet-200">
                Main Exam Average: <span className="font-semibold text-white">71%</span>
              </div>
              {['DBMS', 'Operating Systems', 'Data Structures', 'Algorithms'].map((subject, index) => (
                <div key={subject} className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/60 p-3 text-sm">
                  <span className="text-slate-300">{subject}</span>
                  <span className="font-medium text-white">{[74, 68, 78, 83][index]}%</span>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Exam result summary">
            <div className="space-y-3">
              <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Pass status</div>
                <div className="mt-2 text-2xl font-bold text-emerald-400">Pass</div>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Failed subjects</div>
                <div className="mt-2 text-xl font-bold text-white">1</div>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Action</div>
                <div className="mt-2 text-sm text-slate-300">Prepare for post-exam improvement and complete the pending subject.</div>
              </div>
            </div>
          </SectionCard>
        </div>
      )}

      {examTab === 'Post Exam' && (
        <ExamPaper examType="Post" questions={postExamQuestions} accentClass="border-emerald-500/30 bg-emerald-500/5" />
      )}

      {examTab !== 'Overview' && (
        <div className="grid gap-6 xl:grid-cols-2">
          <SectionCard title="Performance trend">
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData.map((value, idx) => ({ term: `W${idx + 1}`, value }))}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="term" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#a78bfa" strokeWidth={3} dot={{ fill: '#a78bfa', r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </SectionCard>

          <SectionCard title="Subject-wise performance">
            <div className="space-y-4">
              {studentSubjectData.map((item) => (
                <div key={item.subject}>
                  <div className="mb-1 flex justify-between text-sm text-slate-300">
                    <span>{item.subject}</span>
                    <span>{item.score}%</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-slate-800">
                    <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-emerald-400" style={{ width: `${item.score}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      )}
    </div>
  );
}
