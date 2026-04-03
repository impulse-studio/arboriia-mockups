"use client";

import { useState } from "react";
import CalendarGrid from "@/components/CalendarGrid";
import { clientCra } from "@/lib/mockData";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";

export default function ClientPortal() {
  const [action, setAction] = useState<"idle" | "validé" | "contesté">("idle");
  const [comment, setComment] = useState("");

  const handleValidate = () => setAction("validé");
  const handleContest = () => setAction("contesté");

  return (
    <div className="min-h-[calc(100vh-40px)] bg-[#F7F7F7] flex items-start justify-center py-12 px-4">
      <div className="w-full max-w-xl">
        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-9 h-9 rounded-xl bg-teal-600 flex items-center justify-center shadow-sm">
              <span className="text-white text-sm font-bold">A</span>
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">Arboriia</span>
          </div>
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest">Portail Client</span>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.06)] overflow-hidden">
          {/* Header */}
          <div className="px-8 pt-8 pb-6 border-b border-slate-100">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[11px] font-semibold text-teal-600 uppercase tracking-widest mb-1.5">
                  Compte rendu d'activité
                </p>
                <h1 className="text-xl font-bold text-slate-900 tracking-tight">{clientCra.mois}</h1>
              </div>
              <span className="bg-amber-50 text-amber-700 text-[11px] font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                En attente
              </span>
            </div>
          </div>

          <div className="px-8 py-6">
            {/* Mission info */}
            <div className="grid grid-cols-3 gap-4 mb-7 pb-7 border-b border-slate-100">
              <div>
                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Client</p>
                <p className="text-[13px] font-semibold text-slate-900">{clientCra.client}</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Consultant</p>
                <p className="text-[13px] font-semibold text-slate-900">{clientCra.consultant}</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Rôle</p>
                <p className="text-[13px] font-semibold text-slate-900">{clientCra.role}</p>
              </div>
            </div>

            {/* Calendar */}
            <div className="mb-7">
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-4">
                Jours déclarés — {clientCra.mois}
              </p>
              <CalendarGrid
                year={2026}
                month={3}
                workedDays={clientCra.jours}
                readOnly
              />
            </div>

            {/* Summary */}
            <div className="grid grid-cols-3 gap-3 mb-7 pb-7 border-b border-slate-100">
              <div className="bg-slate-50 rounded-xl p-4 text-center">
                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Jours</p>
                <p className="text-2xl font-bold text-slate-900">{clientCra.jours.length}</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4 text-center">
                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">TJM</p>
                <p className="text-2xl font-bold text-slate-900">{clientCra.tjm} €</p>
              </div>
              <div className="bg-teal-600 rounded-xl p-4 text-center">
                <p className="text-[10px] font-semibold text-teal-200 uppercase tracking-widest mb-1.5">Total HT</p>
                <p className="text-2xl font-bold text-white">{clientCra.total.toLocaleString("fr-FR")} €</p>
              </div>
            </div>

            {/* Actions */}
            {action === "idle" && (
              <div className="flex gap-3">
                <button
                  onClick={handleValidate}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-teal-600 text-white rounded-xl text-[13px] font-semibold hover:bg-teal-700 transition-colors shadow-sm"
                >
                  <CheckCircle size={16} />
                  Valider le CRA
                </button>
                <button
                  onClick={handleContest}
                  className="flex-1 flex items-center justify-center gap-2 py-3 border border-red-200 text-red-600 rounded-xl text-[13px] font-semibold hover:bg-red-50 transition-colors"
                >
                  <XCircle size={16} />
                  Contester
                </button>
              </div>
            )}

            {action === "contesté" && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle size={14} className="text-amber-500 shrink-0" />
                  <p className="text-[12px] font-semibold text-slate-600">Motif de contestation</p>
                </div>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={3}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-[13px] font-medium text-slate-800 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-red-400 resize-none placeholder:text-slate-400"
                  placeholder="Décrivez les jours en désaccord..."
                />
                <div className="flex gap-2.5">
                  <button
                    onClick={() => setAction("idle")}
                    className="px-4 py-2.5 text-[13px] font-semibold text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    className="flex-1 py-2.5 bg-red-600 text-white text-[13px] font-semibold rounded-xl hover:bg-red-700 transition-colors disabled:opacity-40"
                    disabled={!comment.trim()}
                  >
                    Envoyer la contestation
                  </button>
                </div>
              </div>
            )}

            {action === "validé" && (
              <div className="flex flex-col items-center py-8 text-center">
                <div className="w-14 h-14 rounded-full bg-teal-100 flex items-center justify-center mb-4">
                  <CheckCircle size={26} className="text-teal-600" />
                </div>
                <p className="text-[15px] font-bold text-slate-900">CRA validé</p>
                <p className="text-[13px] text-slate-400 mt-1.5 font-medium max-w-xs">
                  Le consultant a été notifié. La facture sera générée sous 48h.
                </p>
              </div>
            )}
          </div>
        </div>

        <p className="text-center text-[11px] text-slate-400 mt-8 font-medium">
          © 2026 Arboriia — Plateforme freelance RH
        </p>
      </div>
    </div>
  );
}
