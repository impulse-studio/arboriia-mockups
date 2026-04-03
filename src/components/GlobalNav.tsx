"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function GlobalNav() {
  const pathname = usePathname();

  const links = [
    { href: "/freelance", label: "Freelance", icon: "👤" },
    { href: "/client", label: "Client", icon: "🏢" },
    { href: "/admin", label: "Admin", icon: "⚙️" },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-slate-800 text-white h-10 flex items-center px-4 gap-2 text-sm">
      <span className="text-slate-400 mr-2 text-xs font-medium uppercase tracking-wider">
        Demo
      </span>
      <div className="flex gap-1">
        {links.map((link) => {
          const isActive = pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-medium transition-colors ${
                isActive
                  ? "bg-teal-600 text-white"
                  : "text-slate-300 hover:text-white hover:bg-slate-700"
              }`}
            >
              <span>{link.icon}</span>
              {link.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
