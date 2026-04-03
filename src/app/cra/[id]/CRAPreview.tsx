"use client";

import Link from "next/link";
import CalendarGrid from "@/components/CalendarGrid";
import StatusBadge from "@/components/StatusBadge";
import { craPreviews } from "@/lib/mockData";
import { ArrowLeft, Download, CheckCircle, Clock, Send } from "lucide-react";

interface Props {
  id: string;
}

export default function CRAPreview({ id }: Props) {
  const cra = craPreviews.find((c) => c.id === id) ?? craPreviews[0];

  const timeline = [
    { label: "Créé", date: cra.creeLe, icon: <Clock size={14} />, color: "text-slate-500 bg-slate-100" },
    { label: "Envoyé au client", date: cra.envoiLe, icon: <Send size={14} />, color: "text-blue-600 bg-blue-50" },
    { label: "Validé", date: cra.valideLe, icon: <CheckCircle size={14} />, color: "text-teal-600 bg-teal-50" },
  ];

  return (
    <div className="min-h-[calc(100vh-40px)] bg-slate-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Back link */}
        <Link
          href="/freelance"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 mb-6 transition-colors"
        >
          <ArrowLeft size={14} />
          Retour au dashboard
        </Link>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-800 to-slate-700 px-8 py-6 text-white flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-md bg-teal-500 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">A</span>
                </div>
                <span className="text-sm font-semibold text-slate-300">Arboriia</span>
              </div>
              <h1 className="text-lg font-bold">Compte rendu d'activité</h1>
              <p className="text-slate-300 text-sm mt-0.5">{cra.periode}</p>
            </div>
            <StatusBadge status={cra.statut} />
          </div>

          <div className="p-8">
            {/* Mission info */}
            <div className="grid grid-cols-2 gap-6 mb-7 pb-7 border-b border-slate-100">
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Freelance</p>
                  <p className="text-sm font-semibold text-slate-900">{cra.freelance}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Client</p>
                  <p className="text-sm font-semibold text-slate-900">{cra.client}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Mission</p>
                  <p className="text-sm font-semibold text-slate-900">{cra.mission}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">TJM</p>
                  <p className="text-sm font-semibold text-slate-900">{cra.tjm} €</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8">
              {/* Calendar */}
              <div>
                <h2 className="text-sm font-semibold text-slate-700 mb-4">Jours travaillés</h2>
                <CalendarGrid
                  year={2026}
                  month={2} // March = 2
                  workedDays={cra.jours}
                  readOnly
                />
              </div>

              {/* Right column */}
              <div className="space-y-6">
                {/* Financial summary */}
                <div>
                  <h2 className="text-sm font-semibold text-slate-700 mb-3">Récapitulatif</h2>
                  <div className="bg-slate-50 rounded-lg border border-slate-200 divide-y divide-slate-200">
                    <div className="flex justify-between px-4 py-2.5 text-sm">
                      <span className="text-slate-500">Total jours</span>
                      <span className="font-semibold text-slate-900">{cra.totalJours} jours</span>
                    </div>
                    <div className="flex justify-between px-4 py-2.5 text-sm">
                      <span className="text-slate-500">Montant HT</span>
                      <span className="font-semibold text-slate-900">{cra.montantHT.toLocaleString("fr-FR")} €</span>
                    </div>
                    <div className="flex justify-between px-4 py-2.5 text-sm">
                      <span className="text-slate-500">TVA (20%)</span>
                      <span className="font-medium text-slate-600">{cra.tva.toLocaleString("fr-FR")} €</span>
                    </div>
                    <div className="flex justify-between px-4 py-2.5 text-sm bg-teal-50 rounded-b-lg">
                      <span className="font-semibold text-teal-700">Montant TTC</span>
                      <span className="font-bold text-teal-700">{cra.montantTTC.toLocaleString("fr-FR")} €</span>
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                <div>
                  <h2 className="text-sm font-semibold text-slate-700 mb-3">Historique</h2>
                  <div className="space-y-2">
                    {timeline.map((step, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center ${step.color}`}>
                          {step.icon}
                        </div>
                        <div>
                          <p className="text-xs font-medium text-slate-700">{step.label}</p>
                          <p className="text-xs text-slate-400">{step.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* PDF Button */}
            <div className="mt-8 pt-6 border-t border-slate-100">
              <button className="flex items-center gap-2 px-5 py-2.5 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-sm">
                <Download size={16} />
                Télécharger PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
