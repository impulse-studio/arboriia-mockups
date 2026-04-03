type Status = "validé" | "en attente" | "contesté" | "payée" | "à déposer" | "En mission" | "Disponible";

interface StatusBadgeProps {
  status: Status;
}

const config: Record<Status, { bg: string; text: string; label: string }> = {
  "validé": { bg: "bg-green-100", text: "text-green-700", label: "Validé" },
  "en attente": { bg: "bg-amber-100", text: "text-amber-700", label: "En attente" },
  "contesté": { bg: "bg-red-100", text: "text-red-700", label: "Contesté" },
  "payée": { bg: "bg-green-100", text: "text-green-700", label: "Payée" },
  "à déposer": { bg: "bg-slate-100", text: "text-slate-600", label: "À déposer" },
  "En mission": { bg: "bg-teal-100", text: "text-teal-700", label: "En mission" },
  "Disponible": { bg: "bg-slate-100", text: "text-slate-600", label: "Disponible" },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const c = config[status] ?? { bg: "bg-slate-100", text: "text-slate-600", label: status };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${c.bg} ${c.text}`}>
      {c.label}
    </span>
  );
}
