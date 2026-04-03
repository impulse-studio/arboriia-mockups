type Status = "validé" | "en attente" | "contesté" | "payée" | "à déposer" | "En mission" | "Disponible";

interface StatusBadgeProps {
  status: Status;
}

const config: Record<Status, { dot: string; bg: string; text: string; label: string }> = {
  "validé":      { dot: "bg-emerald-500", bg: "bg-emerald-50",  text: "text-emerald-700", label: "Validé" },
  "en attente":  { dot: "bg-amber-400",   bg: "bg-amber-50",    text: "text-amber-700",   label: "En attente" },
  "contesté":    { dot: "bg-rose-500",    bg: "bg-rose-50",     text: "text-rose-700",    label: "Contesté" },
  "payée":       { dot: "bg-emerald-500", bg: "bg-emerald-50",  text: "text-emerald-700", label: "Payée" },
  "à déposer":   { dot: "bg-slate-400",   bg: "bg-slate-100",   text: "text-slate-600",   label: "À déposer" },
  "En mission":  { dot: "bg-teal-500",    bg: "bg-teal-50",     text: "text-teal-700",    label: "En mission" },
  "Disponible":  { dot: "bg-slate-400",   bg: "bg-slate-100",   text: "text-slate-500",   label: "Disponible" },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const c = config[status] ?? { dot: "bg-slate-400", bg: "bg-slate-100", text: "text-slate-600", label: status };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${c.bg} ${c.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot} shrink-0`} />
      {c.label}
    </span>
  );
}
