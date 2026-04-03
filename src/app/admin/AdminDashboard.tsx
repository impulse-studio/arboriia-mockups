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
  { id: "accueil", label: "Accueil", icon: <LayoutDashboard size={18} /> },
  { id: "missions", label: "Missions", icon: <Briefcase size={18} /> },
  { id: "cra", label: "CRA", icon: <FileText size={18} /> },
  { id: "factures", label: "Factures", icon: <Receipt size={18} /> },
  { id: "freelances", label: "Freelances", icon: <Users size={18} /> },
];

export default function AdminDashboard() {
  const [section, setSection] = useState<Section>("accueil");

  return (
    <div className="flex h-[calc(100vh-40px)]">
      {/* Sidebar */}
      <aside className="w-60 bg-white border-r border-slate-200 flex flex-col shrink-0">
        <div className="px-5 py-5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-teal-600 flex items-center justify-center">
              <span className="text-white text-xs font-bold">A</span>
            </div>
            <span className="font-semibold text-slate-800 text-sm">Arboriia Admin</span>
          </div>
          <p className="text-xs text-slate-500 mt-1 ml-9">Camille Lebrun</p>
        </div>
        <nav className="flex-1 py-4 px-3">
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
        {section === "accueil" && <AccueilSection />}
        {section === "missions" && <MissionsSection />}
        {section === "cra" && <CRASection />}
        {section === "factures" && <FacturesSection />}
        {section === "freelances" && <FreelancesSection />}
      </main>
    </div>
  );
}

function AccueilSection() {
  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-slate-900">Tableau de bord</h1>
        <p className="text-sm text-slate-500 mt-0.5">Avril 2026 — Vue d'ensemble</p>
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
        <MetricCard label="Factures à traiter" value={adminKpis.facturasATraiter} />
      </div>

      {/* CRA en attente */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h2 className="text-sm font-semibold text-slate-800">CRA en attente de validation</h2>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              {["Freelance", "Client", "Mois", "Jours", "Montant client", "Statut"].map((h) => (
                <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {adminCraEnAttente.map((row, i) => (
              <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                <td className="px-5 py-3.5 font-medium text-slate-900">{row.freelance}</td>
                <td className="px-5 py-3.5 text-slate-600">{row.client}</td>
                <td className="px-5 py-3.5 text-slate-600">{row.mois}</td>
                <td className="px-5 py-3.5 text-slate-600">{row.jours} j</td>
                <td className="px-5 py-3.5 font-medium text-slate-900">{row.montantClient.toLocaleString("fr-FR")} €</td>
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

function MissionsSection() {
  const total = adminMissions.reduce((s, m) => s + m.margeMensuelle, 0);
  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-slate-900">Missions actives</h1>
        <p className="text-sm text-slate-500 mt-0.5">Marge par mission — Avril 2026</p>
      </div>
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              {["Freelance", "Client", "TJM Client", "TJM Freelance", "Marge/jour", "Jours/mois", "Marge mensuelle"].map((h) => (
                <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {adminMissions.map((row, i) => (
              <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                <td className="px-5 py-3.5 font-medium text-slate-900">{row.freelance}</td>
                <td className="px-5 py-3.5 text-slate-600">{row.client}</td>
                <td className="px-5 py-3.5 text-slate-600">{row.tjmClient} €</td>
                <td className="px-5 py-3.5 text-slate-600">{row.tjmFreelance} €</td>
                <td className="px-5 py-3.5 text-teal-700 font-medium">{row.margeJour} €</td>
                <td className="px-5 py-3.5 text-slate-600">{row.joursMois}</td>
                <td className="px-5 py-3.5 font-semibold text-slate-900">{row.margeMensuelle.toLocaleString("fr-FR")} €</td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-slate-50 border-t border-slate-200">
            <tr>
              <td colSpan={6} className="px-5 py-3 text-sm font-semibold text-slate-700 text-right">
                Total marge mensuelle
              </td>
              <td className="px-5 py-3 text-sm font-bold text-teal-700">
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
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-slate-900">CRA</h1>
        <p className="text-sm text-slate-500 mt-0.5">Tous les comptes rendus d'activité</p>
      </div>
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              {["Freelance", "Client", "Mois", "Jours", "Montant client", "Statut", "Action"].map((h) => (
                <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {adminCraEnAttente.map((row, i) => (
              <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                <td className="px-5 py-3.5 font-medium text-slate-900">{row.freelance}</td>
                <td className="px-5 py-3.5 text-slate-600">{row.client}</td>
                <td className="px-5 py-3.5 text-slate-600">{row.mois}</td>
                <td className="px-5 py-3.5 text-slate-600">{row.jours} j</td>
                <td className="px-5 py-3.5 font-medium">{row.montantClient.toLocaleString("fr-FR")} €</td>
                <td className="px-5 py-3.5">
                  <StatusBadge status={row.statut} />
                </td>
                <td className="px-5 py-3.5">
                  <Link href="/cra/cra-1" className="text-xs text-teal-600 font-medium hover:text-teal-700 underline underline-offset-2">
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
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-slate-900">Factures</h1>
        <p className="text-sm text-slate-500 mt-0.5">Suivi des factures fournisseurs</p>
      </div>
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              {["Référence", "Freelance", "Client", "Montant HT", "Date", "Statut"].map((h) => (
                <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {factures.map((row, i) => (
              <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                <td className="px-5 py-3.5 font-mono text-xs text-slate-600">{row.ref}</td>
                <td className="px-5 py-3.5 font-medium text-slate-900">{row.freelance}</td>
                <td className="px-5 py-3.5 text-slate-600">{row.client}</td>
                <td className="px-5 py-3.5 font-medium">{row.montant.toLocaleString("fr-FR")} €</td>
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

function FreelancesSection() {
  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-slate-900">Freelances</h1>
        <p className="text-sm text-slate-500 mt-0.5">Communauté Arboriia — {adminFreelances.length} membres</p>
      </div>
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              {["Nom", "Spécialité", "Missions actives", "Statut", "TJM moyen"].map((h) => (
                <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {adminFreelances.map((row, i) => (
              <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 text-xs font-semibold">
                      {row.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <span className="font-medium text-slate-900">{row.name}</span>
                  </div>
                </td>
                <td className="px-5 py-3.5 text-slate-600">{row.specialite}</td>
                <td className="px-5 py-3.5 text-center text-slate-700 font-medium">{row.missions}</td>
                <td className="px-5 py-3.5">
                  <StatusBadge status={row.statut} />
                </td>
                <td className="px-5 py-3.5 font-medium text-slate-900">{row.tjm_moyen} €</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
