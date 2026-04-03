"use client";

interface CalendarGridProps {
  year: number;
  month: number; // 0-based
  workedDays: number[];
  onDayClick?: (day: number) => void;
  readOnly?: boolean;
}

const DAYS = ["L", "M", "M", "J", "V", "S", "D"];
const DAY_LABELS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

export default function CalendarGrid({
  year,
  month,
  workedDays,
  onDayClick,
  readOnly = false,
}: CalendarGridProps) {
  const firstDay = new Date(year, month, 1);
  const firstWeekday = (firstDay.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (number | null)[] = [
    ...Array(firstWeekday).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div className="select-none">
      {/* Day headers */}
      <div className="grid grid-cols-7 mb-2">
        {DAY_LABELS.map((d) => (
          <div key={d} className="text-center text-[10px] font-semibold text-slate-400 uppercase tracking-widest py-1">
            {DAYS[DAY_LABELS.indexOf(d)]}
          </div>
        ))}
      </div>
      {/* Day grid */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, i) => {
          if (!day) return <div key={i} className="aspect-square" />;
          const worked = workedDays.includes(day);
          const isWeekend = (i % 7) >= 5;
          return (
            <button
              key={i}
              onClick={() => !readOnly && onDayClick?.(day)}
              disabled={readOnly || isWeekend}
              className={`
                aspect-square flex items-center justify-center rounded-lg text-[12px] font-semibold transition-all duration-100
                ${worked
                  ? "bg-teal-600 text-white shadow-[0_1px_3px_rgba(13,148,136,0.35)]"
                  : isWeekend
                    ? "text-slate-200 cursor-default"
                    : readOnly
                      ? "bg-slate-50 text-slate-400"
                      : "bg-slate-50 text-slate-500 hover:bg-teal-50 hover:text-teal-700 cursor-pointer"
                }
              `}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
