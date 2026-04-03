interface MetricCardProps {
  label: string;
  value: string | number;
  sub?: string;
  color?: "teal" | "amber" | "blue" | "default";
}

export default function MetricCard({ label, value, sub, color = "default" }: MetricCardProps) {
  const accent = {
    teal: "border-t-teal-500",
    amber: "border-t-amber-400",
    blue: "border-t-blue-500",
    default: "border-t-slate-200",
  }[color];

  return (
    <div className={`bg-white rounded-lg border border-slate-200 border-t-2 ${accent} p-5 shadow-sm`}>
      <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">{label}</p>
      <p className="text-2xl font-bold text-slate-900">{value}</p>
      {sub && <p className="text-xs text-slate-400 mt-1">{sub}</p>}
    </div>
  );
}
