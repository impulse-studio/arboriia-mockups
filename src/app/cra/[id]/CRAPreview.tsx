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
    { label: "Créé",             date: cra.creeLe,   icon: <Clock size={13} />,       dot: "bg-slate-300", text: "text-slate-500" },
    { label: "Envoyé au client", date: cra.envoiLe,  icon: <Send size={13} />,        dot: "bg-blue-400",  text: "text-blue-600" },
    { label: "Validé",           date: cra.valideLe, icon: <CheckCircle size={13} />, dot: "bg-teal-500",  text: "text-teal-600" },
  ];

  return (
    <div className="min-h-[calc(100vh-40px)] bg-[#F7F7F7] py-8 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Back link */}
        <Link
          href="/freelance"
          className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-slate-400 hover:text-slate-700 mb-6 transition-colors"
        >
          <ArrowLeft size={14} />
          Retour au dashboard
        </Link>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.06)] overflow-hidden">
          {/* Header */}
          <div className="px-8 pt-8 pb-6 border-b border-slate-100">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-teal-600 flex items-center justify-center shrink-0">
                  <span className="text-white text-[11px] font-bold">A</span>
                </div>
                <span className="text-[13px] font-semibold text-slate-400">Arboriia</span>
              </div>
              <StatusBadge status={cra.statut} />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-teal-600 uppercase tracking-widest mb-1">
                Compte rendu d'activité
              </p>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">{cra.periode}</h1>
            </div>
          </div>

          <div className="p-8">
            {/* Mission info */}
            <div className="grid grid-cols-2 gap-6 mb-8 pb-8 border-b border-slate-100">
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1">Freelance</p>
                  <p className="text-[13px] font-semibold text-slate-900">{cra.freelance}</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1">Client</p>
                  <p className="text-[13px] font-semibold text-slate-900">{cra.client}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1">Mission</p>
                  <p className="text-[13px] font-semibold text-slate-900">{cra.mission}</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1">TJM</p>
                  <p className="text-[13px] font-semibold text-slate-900">{cra.tjm} €/jour</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8">
              {/* Calendar */}
              <div>
                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-4">Jours travaillés</p>
                <CalendarGrid
                  year={2026}
                  month={2}
                  workedDays={cra.jours}
                  readOnly
                />
              </div>

              {/* Right column */}
              <div className="space-y-6">
                {/* Financial summary */}
                <div>
                  <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-3">Récapitulatif</p>
                  <div className="rounded-xl border border-slate-100 overflow-hidden">
                    <div className="flex justify-between items-center px-4 py-3 border-b border-slate-50">
                      <span className="text-[12px] font-medium text-slate-500">Total jours</span>
                      <span className="text-[13px] font-bold text-slate-900">{cra.totalJours} j</span>
                    </div>
                    <div className="flex justify-between items-center px-4 py-3 border-b border-slate-50">
                      <span className="text-[12px] font-medium text-slate-500">Montant HT</span>
                      <span className="text-[13px] font-bold text-slate-900">{cra.montantHT.toLocaleString("fr-FR")} €</span>
                    </div>
                    <div className="flex justify-between items-center px-4 py-3 border-b border-slate-50">
                      <span className="text-[12px] font-medium text-slate-400">TVA (20%)</span>
                      <span className="text-[13px] font-medium text-slate-500">{cra.tva.toLocaleString("fr-FR")} €</span>
                    </div>
                    <div className="flex justify-between items-center px-4 py-3.5 bg-teal-600 rounded-b-xl">
                      <span className="text-[12px] font-semibold text-teal-100">Montant TTC</span>
                      <span className="text-[14px] font-bold text-white">{cra.montantTTC.toLocaleString("fr-FR")} €</span>
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                <div>
                  <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-4">Historique</p>
                  <div className="space-y-3">
                    {timeline.map((step, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${step.dot} bg-opacity-20 ${step.text}`}>
                          {step.icon}
                        </div>
                        <div>
                          <p className="text-[12px] font-semibold text-slate-700">{step.label}</p>
                          <p className="text-[11px] text-slate-400 font-medium">{step.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* PDF Button */}
            <div className="mt-8 pt-6 border-t border-slate-100">
              <button className="flex items-center gap-2 px-5 py-2.5 border border-slate-200 rounded-xl text-[13px] font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors">
                <Download size={15} />
                Télécharger PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
