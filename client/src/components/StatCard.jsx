export default function StatCard({ label, value, Icon }) {
  return (
    <div className="metric-card">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-400">{label}</p>
        <div className="rounded-xl bg-indigo-500/10 p-2 text-indigo-300">
          <Icon size={18} />
        </div>
      </div>
      <div className="mt-4 text-3xl font-bold text-white">{value}</div>
    </div>
  );
}
