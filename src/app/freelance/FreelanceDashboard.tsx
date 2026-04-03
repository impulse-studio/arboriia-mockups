"use client";

import { useState } from "react";
import Link from "next/link";
import CalendarGrid from "@/components/CalendarGrid";
import StatusBadge from "@/components/StatusBadge";
import { freelanceData, crasFreelance, facturesFreelance } from "@/lib/mockData";
import {
  Home,
  Calendar,
  FileText,
  Receipt,
  ChevronDown,
} from "lucide-react";

type Section = "jours" | "cra" | "factures";

const navItems: { id: Section; label: string; icon: React.ReactNode }[] = [
  { id: "jours", label: "Mes jours", icon: <Calendar size={18} /> },
  { id: "cra", label: "Mes CRA", icon: <FileText size={18} /> },
  { id: "factures", label: "Mes factures", icon: <Receipt size={18} /> },
];

export default function FreelanceDashboard() {
  const [section, setSection] = useState<Section>("jours");

  return (
    <div className="flex h-[calc(100vh-40px)]">
      {/* Sidebar */}
      <aside className="w-60 bg-white border-r border-slate-200 flex flex-col shrink-0">
        <div className="px-5 py-5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-teal-600 flex items-center justify-center">
              <span className="text-white text-xs font-bold">A</span>
            </div>
            <span className="font-semibold text-slate-800 text-sm">Arboriia</span>
          </div>
          <p className="text-xs text-slate-500 mt-1 ml-9">{freelanceData.name}</p>
        </div>
        <nav className="flex-1 py-4 px-3">
          <button
            onClick={() => setSection("jours")}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium mb-0.5 transition-colors text-left text-slate-600 hover:bg-slate-50 hover:text-slate-900`}
          >
            <Home size={18} />
            Accueil
          </button>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setSection(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium mb-0.5 transition-colors text-left ${
                section === item.id
                  ? "bg-teal-50 text-teal-700"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto bg-slate-50">
        {section === "jours" && <JoursSection />}
        {section === "cra" && <CRASection />}
        {section === "factures" && <FacturesSection />}
      </main>
    </div>
  );
}

function JoursSection() {
  const [selectedMission, setSelectedMission] = useState(freelanceData.mission_selected);
  const [workedDays, setWorkedDays] = useState<number[]>(freelanceData.jours_avril);
  const mission = freelanceData.missions.find((m) => m.id === selectedMission)!;

  const toggleDay = (day: number) => {
    setWorkedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const montant = workedDays.length * mission.tjm_freelance;

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-slate-900">Mes jours — Avril 2026</h1>
        <p className="text-sm text-slate-500 mt-0.5">Cliquez sur un jour pour le marquer comme travaillé</p>
      </div>

      {/* Mission selector */}
      <div className="mb-6">
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">
          Mission
        </label>
        <div className="relative inline-block">
          <select
            value={selectedMission}
            onChange={(e) => setSelectedMission(Number(e.target.value))}
            className="appearance-none bg-white border border-slate-200 rounded-lg px-4 py-2.5 pr-10 text-sm font-medium text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
          >
            {freelanceData.missions.map((m) => (
              <option key={m.id} value={m.id}>
                {m.client} — {m.role} ({m.tjm_freelance} €/j)
              </option>
            ))}
          </select>
          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>
      </div>

      {/* Calendar */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6 max-w-md">
        <CalendarGrid
          year={2026}
          month={3} // April = 3 (0-based)
          workedDays={workedDays}
          onDayClick={toggleDay}
        />
      </div>

      {/* Summary */}
      <div className="mt-4 flex items-center gap-6 bg-white rounded-lg border border-slate-200 shadow-sm px-6 py-4 max-w-md">
        <div>
          <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Jours travaillés</p>
          <p className="text-2xl font-bold text-teal-700 mt-0.5">{workedDays.length} j</p>
        </div>
        <div className="w-px h-10 bg-slate-200" />
        <div>
          <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Montant estimé</p>
          <p className="text-2xl font-bold text-slate-900 mt-0.5">{montant.toLocaleString("fr-FR")} €</p>
        </div>
        <div className="w-px h-10 bg-slate-200" />
        <div>
          <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">TJM</p>
          <p className="text-2xl font-bold text-slate-700 mt-0.5">{mission.tjm_freelance} €</p>
        </div>
      </div>
    </div>
  );
}

function CRASection() {
  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-slate-900">Mes CRA</h1>
        <p className="text-sm text-slate-500 mt-0.5">Historique de vos comptes rendus d'activité</p>
      </div>
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              {["Mois", "Client", "Jours", "Montant", "Statut", "Action"].map((h) => (
                <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {crasFreelance.map((row, i) => (
              <tr key={row.id} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                <td className="px-5 py-3.5 font-medium text-slate-900">{row.mois}</td>
                <td className="px-5 py-3.5 text-slate-600">{row.client}</td>
                <td className="px-5 py-3.5 text-slate-600">{row.jours} j</td>
                <td className="px-5 py-3.5 font-medium text-slate-900">{row.montant.toLocaleString("fr-FR")} €</td>
                <td className="px-5 py-3.5">
                  <StatusBadge status={row.statut} />
                </td>
                <td className="px-5 py-3.5">
                  <Link
                    href={`/cra/${row.id}`}
                    className="text-xs text-teal-600 font-medium hover:text-teal-700 underline underline-offset-2"
                  >
                    Voir le CRA →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function FacturesSection() {
  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Mes factures</h1>
          <p className="text-sm text-slate-500 mt-0.5">Suivi de vos factures Arboriia</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition-colors shadow-sm">
          + Déposer une facture
        </button>
      </div>
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              {["Référence", "Client", "Montant HT", "Date", "Statut"].map((h) => (
                <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {facturesFreelance.map((row, i) => (
              <tr key={row.ref} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                <td className="px-5 py-3.5 font-mono text-xs text-slate-600">{row.ref}</td>
                <td className="px-5 py-3.5 text-slate-700">{row.client}</td>
                <td className="px-5 py-3.5 font-medium text-slate-900">{row.montant.toLocaleString("fr-FR")} €</td>
                <td className="px-5 py-3.5 text-slate-600">{row.date}</td>
                <td className="px-5 py-3.5">
                  <StatusBadge status={row.statut} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
