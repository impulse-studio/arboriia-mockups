"use client";

import { useState } from "react";
import Link from "next/link";
import MetricCard from "@/components/MetricCard";
import StatusBadge from "@/components/StatusBadge";
import {
  adminKpis,
  adminCraEnAttente,
  adminMissions,
  adminFreelances,
} from "@/lib/mockData";
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  Receipt,
  Users,
} from "lucide-react";

type Section = "accueil" | "missions" | "cra" | "factures" | "freelances";

const navItems: { id: Section; label: string; icon: React.ReactNode }[] = [
  { id: "accueil",    label: "Accueil",     icon: <LayoutDashboard size={16} /> },
  { id: "missions",  label: "Missions",    icon: <Briefcase size={16} /> },
  { id: "cra",       label: "CRA",         icon: <FileText size={16} /> },
  { id: "factures",  label: "Factures",    icon: <Receipt size={16} /> },
  { id: "freelances",label: "Freelances",  icon: <Users size={16} /> },
];

export default function AdminDashboard() {
  const [section, setSection] = useState<Section>("accueil");

  return (
    <div className="flex h-[calc(100vh-40px)]">
      {/* Sidebar */}
      <aside className="w-56 bg-white border-r border-slate-100 flex flex-col shrink-0">
        {/* User header */}
        <div className="px-4 py-5 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center shrink-0">
              <span className="text-white text-xs font-bold">CL</span>
            </div>
            <div className="min-w-0">
              <p className="text-[13px] font-semibold text-slate-800 leading-tight truncate">Camille Lebrun</p>
              <p className="text-[11px] text-slate-400 font-medium">Administratrice</p>
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

        {/* Footer */}
        <div className="px-4 py-4 border-t border-slate-100">
          <p className="text-[10px] font-medium text-slate-300 uppercase tracking-widest">Arboriia Admin</p>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto bg-[#F7F7F7]">
        {section === "accueil"    && <AccueilSection />}
        {section === "missions"   && <MissionsSection />}
        {section === "cra"        && <CRASection />}
        {section === "factures"   && <FacturesSection />}
        {section === "freelances" && <FreelancesSection />}
      </main>
    </div>
  );
}

function AccueilSection() {
  return (
    <div className="p-8 max-w-6xl">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Tableau de bord</h1>
        <p className="text-sm text-slate-400 mt-1 font-medium">Avril 2026 — Vue d'ensemble</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <MetricCard label="Freelances actifs" value={adminKpis.freelancesActifs} color="teal" />
        <MetricCard label="CRA en attente" value={adminKpis.craEnAttente} color="amber" />
        <MetricCard
          label="Marge brute du mois"
          value={`${adminKpis.margeBrute.toLocaleString("fr-FR")} €`}
          color="blue"
        />
        <MetricCard label="Factures à traiter" value={adminKpis.facturasATraiter} color="rose" />
      </div>

      {/* CRA en attente table */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-[0_1px_4px_rgba(0,0,0,0.04)] overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-[13px] font-semibold text-slate-800">CRA en attente de validation</h2>
          <span className="text-[11px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
            {adminCraEnAttente.length}
          </span>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100">
              {["Freelance", "Client", "Mois", "Jours", "Montant client", "Statut"].map((h) => (
                <th key={h} className="px-6 py-3 text-left text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {adminCraEnAttente.map((row, i) => (
              <tr key={i} className="hover:bg-slate-50/60 transition-colors group">
                <td className="px-6 py-4 text-[13px] font-semibold text-slate-900">{row.freelance}</td>
                <td className="px-6 py-4 text-[13px] text-slate-500 font-medium">{row.client}</td>
                <td className="px-6 py-4 text-[13px] text-slate-500 font-medium">{row.mois}</td>
                <td className="px-6 py-4 text-[13px] text-slate-500 font-medium">{row.jours} j</td>
                <td className="px-6 py-4 text-[13px] font-semibold text-slate-900">{row.montantClient.toLocaleString("fr-FR")} €</td>
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

function MissionsSection() {
  const total = adminMissions.reduce((s, m) => s + m.margeMensuelle, 0);
  return (
    <div className="p-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Missions actives</h1>
        <p className="text-sm text-slate-400 mt-1 font-medium">Marge par mission — Avril 2026</p>
      </div>
      <div className="bg-white rounded-xl border border-slate-100 shadow-[0_1px_4px_rgba(0,0,0,0.04)] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100">
              {["Freelance", "Client", "TJM Client", "TJM Freelance", "Marge/jour", "Jours/mois", "Marge mensuelle"].map((h) => (
                <th key={h} className="px-6 py-3 text-left text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {adminMissions.map((row, i) => (
              <tr key={i} className="hover:bg-slate-50/60 transition-colors">
                <td className="px-6 py-4 text-[13px] font-semibold text-slate-900">{row.freelance}</td>
                <td className="px-6 py-4 text-[13px] text-slate-500 font-medium">{row.client}</td>
                <td className="px-6 py-4 text-[13px] text-slate-500 font-medium">{row.tjmClient} €</td>
                <td className="px-6 py-4 text-[13px] text-slate-500 font-medium">{row.tjmFreelance} €</td>
                <td className="px-6 py-4">
                  <span className="text-[12px] font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md">
                    +{row.margeJour} €
                  </span>
                </td>
                <td className="px-6 py-4 text-[13px] text-slate-500 font-medium">{row.joursMois} j</td>
                <td className="px-6 py-4 text-[13px] font-bold text-slate-900">{row.margeMensuelle.toLocaleString("fr-FR")} €</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t border-slate-200 bg-slate-50">
              <td colSpan={6} className="px-6 py-3.5 text-[12px] font-semibold text-slate-500 text-right">
                Total marge mensuelle
              </td>
              <td className="px-6 py-3.5 text-[14px] font-bold text-teal-700">
                {total.toLocaleString("fr-FR")} €
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

function CRASection() {
  return (
    <div className="p-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">CRA</h1>
        <p className="text-sm text-slate-400 mt-1 font-medium">Comptes rendus d'activité — tous les freelances</p>
      </div>
      <div className="bg-white rounded-xl border border-slate-100 shadow-[0_1px_4px_rgba(0,0,0,0.04)] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100">
              {["Freelance", "Client", "Mois", "Jours", "Montant client", "Statut", ""].map((h) => (
                <th key={h} className="px-6 py-3 text-left text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {adminCraEnAttente.map((row, i) => (
              <tr key={i} className="hover:bg-slate-50/60 transition-colors group">
                <td className="px-6 py-4 text-[13px] font-semibold text-slate-900">{row.freelance}</td>
                <td className="px-6 py-4 text-[13px] text-slate-500 font-medium">{row.client}</td>
                <td className="px-6 py-4 text-[13px] text-slate-500 font-medium">{row.mois}</td>
                <td className="px-6 py-4 text-[13px] text-slate-500 font-medium">{row.jours} j</td>
                <td className="px-6 py-4 text-[13px] font-semibold text-slate-900">{row.montantClient.toLocaleString("fr-FR")} €</td>
                <td className="px-6 py-4">
                  <StatusBadge status={row.statut} />
                </td>
                <td className="px-6 py-4">
                  <Link
                    href="/cra/cra-1"
                    className="text-[12px] font-semibold text-teal-600 hover:text-teal-700 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Voir →
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
  const factures = [
    { ref: "FAC-2026-003", freelance: "Sophie Marchand", client: "Groupama", montant: 8550, date: "01/04/2026", statut: "en attente" as const },
    { ref: "FAC-2026-002", freelance: "Thomas Duval", client: "Société Générale", montant: 11440, date: "03/03/2026", statut: "validé" as const },
    { ref: "FAC-2026-001", freelance: "Marie Leroy", client: "AXA", montant: 7200, date: "03/02/2026", statut: "validé" as const },
  ];
  return (
    <div className="p-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Factures</h1>
        <p className="text-sm text-slate-400 mt-1 font-medium">Suivi des factures fournisseurs</p>
      </div>
      <div className="bg-white rounded-xl border border-slate-100 shadow-[0_1px_4px_rgba(0,0,0,0.04)] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100">
              {["Référence", "Freelance", "Client", "Montant HT", "Date", "Statut"].map((h) => (
                <th key={h} className="px-6 py-3 text-left text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {factures.map((row, i) => (
              <tr key={i} className="hover:bg-slate-50/60 transition-colors">
                <td className="px-6 py-4">
                  <span className="text-[11px] font-mono font-semibold text-slate-400 bg-slate-50 px-2 py-1 rounded">{row.ref}</span>
                </td>
                <td className="px-6 py-4 text-[13px] font-semibold text-slate-900">{row.freelance}</td>
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

function FreelancesSection() {
  return (
    <div className="p-8 max-w-6xl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Freelances</h1>
          <p className="text-sm text-slate-400 mt-1 font-medium">Communauté Arboriia — {adminFreelances.length} membres</p>
        </div>
        <div className="flex gap-2 text-[12px] font-semibold">
          <span className="bg-teal-50 text-teal-700 px-3 py-1.5 rounded-full">
            {adminFreelances.filter(f => f.statut === "En mission").length} en mission
          </span>
          <span className="bg-slate-100 text-slate-500 px-3 py-1.5 rounded-full">
            {adminFreelances.filter(f => f.statut === "Disponible").length} disponible
          </span>
        </div>
      </div>
      <div className="bg-white rounded-xl border border-slate-100 shadow-[0_1px_4px_rgba(0,0,0,0.04)] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100">
              {["Nom", "Spécialité", "Missions actives", "Statut", "TJM moyen"].map((h) => (
                <th key={h} className="px-6 py-3 text-left text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {adminFreelances.map((row, i) => (
              <tr key={i} className="hover:bg-slate-50/60 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 text-[11px] font-bold shrink-0">
                      {row.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <span className="text-[13px] font-semibold text-slate-900">{row.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-[13px] text-slate-500 font-medium">{row.specialite}</td>
                <td className="px-6 py-4">
                  <span className="text-[13px] font-semibold text-slate-900">{row.missions}</span>
                  <span className="text-[12px] text-slate-400 ml-1">mission{row.missions > 1 ? "s" : ""}</span>
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={row.statut} />
                </td>
                <td className="px-6 py-4 text-[13px] font-semibold text-slate-900">{row.tjm_moyen} €<span className="text-[11px] text-slate-400 font-medium">/j</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
