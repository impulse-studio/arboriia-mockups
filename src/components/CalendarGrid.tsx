"use client";

interface CalendarGridProps {
  year: number;
  month: number; // 0-based
  workedDays: number[];
  onDayClick?: (day: number) => void;
  readOnly?: boolean;
}

const DAYS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

export default function CalendarGrid({
  year,
  month,
  workedDays,
  onDayClick,
  readOnly = false,
}: CalendarGridProps) {
  const firstDay = new Date(year, month, 1);
  // getDay() returns 0=Sun, 1=Mon... convert to Mon-based (0=Mon, 6=Sun)
  const firstWeekday = (firstDay.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (number | null)[] = [
    ...Array(firstWeekday).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  // Pad to complete weeks
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div className="select-none">
      <div className="grid grid-cols-7 mb-1">
        {DAYS.map((d) => (
          <div key={d} className="text-center text-xs font-semibold text-slate-500 py-1">
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, i) => {
          if (!day) return <div key={i} />;
          const worked = workedDays.includes(day);
          const isWeekend = ((i % 7) >= 5);
          return (
            <button
              key={i}
              onClick={() => !readOnly && onDayClick?.(day)}
              disabled={readOnly}
              className={`
                aspect-square flex items-center justify-center rounded text-sm font-medium transition-colors
                ${worked
                  ? "bg-teal-500 text-white shadow-sm"
                  : isWeekend
                    ? "bg-slate-50 text-slate-300 cursor-default"
                    : readOnly
                      ? "bg-slate-100 text-slate-400"
                      : "bg-slate-100 text-slate-500 hover:bg-teal-50 hover:text-teal-600 cursor-pointer"
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
