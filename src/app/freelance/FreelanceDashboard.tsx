"use client";

import { useState } from "react";
import Link from "next/link";
import CalendarGrid from "@/components/CalendarGrid";
import StatusBadge from "@/components/StatusBadge";
import { freelanceData, crasFreelance, facturesFreelance } from "@/lib/mockData";
import {
  Calendar,
  FileText,
  Receipt,
  ChevronDown,
  Upload,
} from "lucide-react";

type Section = "jours" | "cra" | "factures";

const navItems: { id: Section; label: string; icon: React.ReactNode }[] = [
  { id: "jours",    label: "Mes jours",    icon: <Calendar size={16} /> },
  { id: "cra",      label: "Mes CRA",      icon: <FileText size={16} /> },
  { id: "factures", label: "Mes factures", icon: <Receipt size={16} /> },
];

export default function FreelanceDashboard() {
  const [section, setSection] = useState<Section>("jours");

  return (
    <div className="flex h-[calc(100vh-40px)]">
      {/* Sidebar */}
      <aside className="w-56 bg-white border-r border-slate-100 flex flex-col shrink-0">
        {/* User header */}
        <div className="px-4 py-5 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center shrink-0">
              <span className="text-white text-xs font-bold">SM</span>
            </div>
            <div className="min-w-0">
              <p className="text-[13px] font-semibold text-slate-800 leading-tight truncate">{freelanceData.name}</p>
              <p className="text-[11px] text-slate-400 font-medium">Freelance RH</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-3 px-2 space-y-0.5">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setSection(item.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all duration-100 text-left ${
                section === item.id
                  ? "bg-teal-600 text-white shadow-sm"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        {/* Missions indicator */}
        <div className="px-4 py-4 border-t border-slate-100">
          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-2">Missions actives</p>
          {freelanceData.missions.map((m) => (
            <div key={m.id} className="flex items-center gap-2 mb-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />
              <p className="text-[11px] font-medium text-slate-600 truncate">{m.client}</p>
            </div>
          ))}
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto bg-[#F7F7F7]">
        {section === "jours"    && <JoursSection />}
        {section === "cra"      && <CRASection />}
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
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Mes jours — Avril 2026</h1>
        <p className="text-sm text-slate-400 mt-1 font-medium">Cliquez sur un jour pour le marquer comme travaillé</p>
      </div>

      {/* Mission selector */}
      <div className="mb-6">
        <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest block mb-2">
          Mission sélectionnée
        </label>
        <div className="relative inline-block">
          <select
            value={selectedMission}
            onChange={(e) => setSelectedMission(Number(e.target.value))}
            className="appearance-none bg-white border border-slate-200 rounded-xl px-4 py-2.5 pr-10 text-[13px] font-semibold text-slate-800 shadow-[0_1px_3px_rgba(0,0,0,0.04)] focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
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

      <div className="flex gap-6 items-start">
        {/* Calendar */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-[0_1px_4px_rgba(0,0,0,0.04)] p-6 w-80 shrink-0">
          <CalendarGrid
            year={2026}
            month={3}
            workedDays={workedDays}
            onDayClick={toggleDay}
          />
        </div>

        {/* Summary */}
        <div className="flex flex-col gap-3">
          <div className="bg-white rounded-xl border border-slate-100 shadow-[0_1px_4px_rgba(0,0,0,0.04)] px-6 py-5">
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Jours travaillés</p>
            <p className="text-4xl font-bold text-teal-700 tracking-tight">{workedDays.length}</p>
            <p className="text-[12px] text-slate-400 mt-1 font-medium">jours ce mois</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-100 shadow-[0_1px_4px_rgba(0,0,0,0.04)] px-6 py-5">
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Montant estimé</p>
            <p className="text-4xl font-bold text-slate-900 tracking-tight">{montant.toLocaleString("fr-FR")}</p>
            <p className="text-[12px] text-slate-400 mt-1 font-medium">€ HT — {mission.tjm_freelance} €/j</p>
          </div>
          <div className="bg-teal-600 rounded-xl px-6 py-4">
            <p className="text-[10px] font-semibold text-teal-200 uppercase tracking-widest mb-1">Mission active</p>
            <p className="text-[13px] font-bold text-white">{mission.client}</p>
            <p className="text-[12px] text-teal-200 font-medium">{mission.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CRASection() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Mes CRA</h1>
        <p className="text-sm text-slate-400 mt-1 font-medium">Historique de vos comptes rendus d'activité</p>
      </div>
      <div className="bg-white rounded-xl border border-slate-100 shadow-[0_1px_4px_rgba(0,0,0,0.04)] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100">
              {["Mois", "Client", "Jours", "Montant", "Statut", ""].map((h) => (
                <th key={h} className="px-6 py-3 text-left text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {crasFreelance.map((row) => (
              <tr key={row.id} className="hover:bg-slate-50/60 transition-colors group">
                <td className="px-6 py-4 text-[13px] font-semibold text-slate-900">{row.mois}</td>
                <td className="px-6 py-4 text-[13px] text-slate-500 font-medium">{row.client}</td>
                <td className="px-6 py-4 text-[13px] text-slate-500 font-medium">{row.jours} j</td>
                <td className="px-6 py-4 text-[13px] font-semibold text-slate-900">{row.montant.toLocaleString("fr-FR")} €</td>
                <td className="px-6 py-4">
                  <StatusBadge status={row.statut} />
                </td>
                <td className="px-6 py-4">
                  <Link
                    href={`/cra/${row.id}`}
                    className="text-[12px] font-semibold text-teal-600 hover:text-teal-700 opacity-0 group-hover:opacity-100 transition-opacity"
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
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Mes factures</h1>
          <p className="text-sm text-slate-400 mt-1 font-medium">Suivi de vos factures Arboriia</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-teal-600 text-white text-[13px] font-semibold rounded-xl hover:bg-teal-700 transition-colors shadow-sm">
          <Upload size={14} />
          Déposer une facture
        </button>
      </div>
      <div className="bg-white rounded-xl border border-slate-100 shadow-[0_1px_4px_rgba(0,0,0,0.04)] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100">
              {["Référence", "Client", "Montant HT", "Date", "Statut"].map((h) => (
                <th key={h} className="px-6 py-3 text-left text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {facturesFreelance.map((row) => (
              <tr key={row.ref} className="hover:bg-slate-50/60 transition-colors">
                <td className="px-6 py-4">
                  <span className="text-[11px] font-mono font-semibold text-slate-400 bg-slate-50 px-2 py-1 rounded">{row.ref}</span>
                </td>
                <td className="px-6 py-4 text-[13px] text-slate-500 font-medium">{row.client}</td>
                <td className="px-6 py-4 text-[13px] font-semibold text-slate-900">{row.montant.toLocaleString("fr-FR")} €</td>
                <td className="px-6 py-4 text-[13px] text-slate-400 font-medium">{row.date}</td>
                <td className="px-6 py-4">
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
