interface MetricCardProps {
  label: string;
  value: string | number;
  sub?: string;
  color?: "teal" | "amber" | "blue" | "rose" | "default";
}

const dotColors = {
  teal: "bg-teal-500",
  amber: "bg-amber-400",
  blue: "bg-blue-500",
  rose: "bg-rose-500",
  default: "bg-slate-300",
};

export default function MetricCard({ label, value, sub, color = "default" }: MetricCardProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-100 p-5 shadow-[0_1px_4px_rgba(0,0,0,0.04)] hover:shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-shadow">
      <div className="flex items-center gap-1.5 mb-3">
        <div className={`w-1.5 h-1.5 rounded-full ${dotColors[color]}`} />
        <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest">{label}</p>
      </div>
      <p className="text-3xl font-bold text-slate-900 tracking-tight leading-none">{value}</p>
      {sub && <p className="text-xs text-slate-400 mt-2 font-medium">{sub}</p>}
    </div>
  );
}
