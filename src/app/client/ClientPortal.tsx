"use client";

import { useState } from "react";
import CalendarGrid from "@/components/CalendarGrid";
import { clientCra } from "@/lib/mockData";
import { CheckCircle, XCircle } from "lucide-react";

export default function ClientPortal() {
  const [action, setAction] = useState<"idle" | "validé" | "contesté">("idle");
  const [comment, setComment] = useState("");

  const handleValidate = () => setAction("validé");
  const handleContest = () => setAction("contesté");

  return (
    <div className="min-h-[calc(100vh-40px)] bg-slate-50 flex items-start justify-center py-10 px-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center">
              <span className="text-white text-sm font-bold">A</span>
            </div>
            <span className="text-xl font-bold text-slate-800">Arboriia</span>
          </div>
          <p className="text-xs text-slate-400 uppercase tracking-widest font-medium">Portail Client</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Title bar */}
          <div className="bg-gradient-to-r from-teal-600 to-teal-500 px-8 py-6 text-white">
            <h1 className="text-lg font-bold">Compte rendu d'activité</h1>
            <p className="text-teal-100 mt-0.5 text-sm">{clientCra.mois}</p>
          </div>

          <div className="p-8">
            {/* Mission info */}
            <div className="grid grid-cols-3 gap-4 mb-7 pb-7 border-b border-slate-100">
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Client</p>
                <p className="text-sm font-semibold text-slate-800">{clientCra.client}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Consultant</p>
                <p className="text-sm font-semibold text-slate-800">{clientCra.consultant}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Rôle</p>
                <p className="text-sm font-semibold text-slate-800">{clientCra.role}</p>
              </div>
            </div>

            {/* Calendar */}
            <div className="mb-7">
              <h2 className="text-sm font-semibold text-slate-700 mb-4">
                Jours déclarés — {clientCra.mois}
              </h2>
              <CalendarGrid
                year={2026}
                month={3}
                workedDays={clientCra.jours}
                readOnly
              />
            </div>

            {/* Summary */}
            <div className="grid grid-cols-3 gap-3 mb-8 pb-7 border-b border-slate-100">
              <div className="bg-slate-50 rounded-lg p-4 text-center">
                <p className="text-xs font-medium text-slate-500 mb-1">Jours travaillés</p>
                <p className="text-2xl font-bold text-slate-900">{clientCra.jours.length}</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-4 text-center">
                <p className="text-xs font-medium text-slate-500 mb-1">TJM facturé</p>
                <p className="text-2xl font-bold text-slate-900">{clientCra.tjm} €</p>
              </div>
              <div className="bg-teal-50 rounded-lg p-4 text-center">
                <p className="text-xs font-medium text-teal-600 mb-1">Montant total HT</p>
                <p className="text-2xl font-bold text-teal-700">{clientCra.total.toLocaleString("fr-FR")} €</p>
              </div>
            </div>

            {/* Actions */}
            {action === "idle" && (
              <div className="flex gap-3">
                <button
                  onClick={handleValidate}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition-colors shadow-sm"
                >
                  <CheckCircle size={18} />
                  Valider le CRA
                </button>
                <button
                  onClick={handleContest}
                  className="flex-1 flex items-center justify-center gap-2 py-3 border-2 border-red-400 text-red-600 rounded-lg font-medium hover:bg-red-50 transition-colors"
                >
                  <XCircle size={18} />
                  Contester
                </button>
              </div>
            )}

            {action === "contesté" && (
              <div className="space-y-3">
                <label className="text-sm font-semibold text-slate-700 block">
                  Motif de contestation
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={4}
                  className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-400 resize-none"
                  placeholder="Décrivez les jours en désaccord et la raison de votre contestation..."
                />
                <div className="flex gap-3">
                  <button
                    onClick={() => setAction("idle")}
                    className="px-4 py-2 text-sm text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50"
                  >
                    Annuler
                  </button>
                  <button
                    className="flex-1 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
                    disabled={!comment.trim()}
                  >
                    Envoyer la contestation
                  </button>
                </div>
              </div>
            )}

            {action === "validé" && (
              <div className="flex flex-col items-center py-6 text-center">
                <div className="w-14 h-14 rounded-full bg-teal-100 flex items-center justify-center mb-3">
                  <CheckCircle size={28} className="text-teal-600" />
                </div>
                <p className="text-base font-semibold text-slate-800">CRA validé avec succès</p>
                <p className="text-sm text-slate-500 mt-1">
                  Le consultant a été notifié. La facture sera générée sous 48h.
                </p>
              </div>
            )}
          </div>
        </div>

        <p className="text-center text-xs text-slate-400 mt-6">
          © Arboriia — Plateforme freelance RH
        </p>
      </div>
    </div>
  );
}
