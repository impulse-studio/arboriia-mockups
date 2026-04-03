"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function GlobalNav() {
  const pathname = usePathname();

  const links = [
    { href: "/freelance", label: "Freelance" },
    { href: "/client", label: "Client" },
    { href: "/admin", label: "Admin" },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-100 h-10 flex items-center px-5 gap-4">
      {/* Logo */}
      <div className="flex items-center gap-2 mr-3">
        <div className="w-5 h-5 rounded bg-teal-600 flex items-center justify-center shrink-0">
          <span className="text-white text-[9px] font-bold tracking-tight">A</span>
        </div>
        <span className="text-xs font-semibold text-slate-700 tracking-tight">Arboriia</span>
      </div>

      {/* Divider */}
      <div className="w-px h-4 bg-slate-200" />

      {/* Demo label */}
      <span className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">
        Démonstration
      </span>

      {/* Role switcher */}
      <div className="flex items-center gap-0.5 ml-auto bg-slate-100 rounded-full p-0.5">
        {links.map((link) => {
          const isActive = pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all duration-150 ${
                isActive
                  ? "bg-white text-slate-900 shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
