// ============================================================
// Mock data for Arboriia mockups — all data is hardcoded
// ============================================================

export const freelanceData = {
  name: "Sophie Marchand",
  missions: [
    {
      id: 1,
      client: "Groupama",
      role: "Recruteuse senior",
      tjm_freelance: 450,
      start_date: "2026-01-15",
      status: "active",
    },
    {
      id: 2,
      client: "BNP Paribas",
      role: "Consultante RH",
      tjm_freelance: 500,
      start_date: "2026-03-01",
      status: "active",
    },
  ],
  jours_avril: [1, 2, 3, 4, 7, 8, 9, 10, 11, 14, 15, 16, 17, 18, 22, 23, 24, 25],
  mission_selected: 1,
};

export const crasFreelance = [
  { id: "cra-1", mois: "Mars 2026", client: "Groupama", jours: 19, montant: 8550, statut: "validé" as const },
  { id: "cra-2", mois: "Février 2026", client: "Groupama", jours: 20, montant: 9000, statut: "validé" as const },
  { id: "cra-3", mois: "Janvier 2026", client: "Groupama", jours: 18, montant: 8100, statut: "validé" as const },
  { id: "cra-4", mois: "Mars 2026", client: "BNP Paribas", jours: 5, montant: 2500, statut: "en attente" as const },
];

export const facturesFreelance = [
  { ref: "FAC-2026-003", client: "Groupama", montant: 8550, date: "01/04/2026", statut: "payée" as const },
  { ref: "FAC-2026-002", client: "Groupama", montant: 9000, date: "03/03/2026", statut: "payée" as const },
  { ref: "FAC-2026-001", client: "Groupama", montant: 8100, date: "03/02/2026", statut: "payée" as const },
  { ref: "FAC-2026-004", client: "BNP Paribas", montant: 2500, date: "01/04/2026", statut: "en attente" as const },
];

export const clientCra = {
  client: "Groupama",
  consultant: "Sophie Marchand",
  role: "Recruteuse senior",
  mois: "Avril 2026",
  jours: [1, 2, 3, 4, 7, 8, 9, 10, 11, 14, 15, 16, 17, 18],
  tjm: 550,
  total: 7700,
};

export const adminKpis = {
  freelancesActifs: 8,
  craEnAttente: 3,
  margeBrute: 12450,
  facturasATraiter: 2,
};

export const adminCraEnAttente = [
  { freelance: "Sophie Marchand", client: "BNP Paribas", mois: "Mars 2026", jours: 5, montantClient: 2750, statut: "en attente" as const },
  { freelance: "Thomas Duval", client: "Société Générale", mois: "Mars 2026", jours: 22, montantClient: 13200, statut: "en attente" as const },
  { freelance: "Marie Leroy", client: "AXA", mois: "Mars 2026", jours: 15, montantClient: 9000, statut: "contesté" as const },
];

export const adminMissions = [
  { freelance: "Sophie Marchand", client: "Groupama", tjmClient: 550, tjmFreelance: 450, margeJour: 100, joursMois: 19, margeMensuelle: 1900 },
  { freelance: "Sophie Marchand", client: "BNP Paribas", tjmClient: 600, tjmFreelance: 500, margeJour: 100, joursMois: 5, margeMensuelle: 500 },
  { freelance: "Thomas Duval", client: "Société Générale", tjmClient: 650, tjmFreelance: 520, margeJour: 130, joursMois: 22, margeMensuelle: 2860 },
  { freelance: "Marie Leroy", client: "AXA", tjmClient: 600, tjmFreelance: 480, margeJour: 120, joursMois: 15, margeMensuelle: 1800 },
  { freelance: "Julie Martin", client: "LVMH", tjmClient: 700, tjmFreelance: 550, margeJour: 150, joursMois: 20, margeMensuelle: 3000 },
  { freelance: "Alexandre Petit", client: "Engie", tjmClient: 500, tjmFreelance: 400, margeJour: 100, joursMois: 18, margeMensuelle: 1800 },
  { freelance: "Nadia Benali", client: "Orange", tjmClient: 580, tjmFreelance: 470, margeJour: 110, joursMois: 21, margeMensuelle: 2310 },
  { freelance: "Lucas Moreau", client: "Carrefour", tjmClient: 520, tjmFreelance: 420, margeJour: 100, joursMois: 10, margeMensuelle: 1000 },
];

export const adminFreelances = [
  { name: "Sophie Marchand", specialite: "Recrutement IT", missions: 2, statut: "En mission" as const, tjm_moyen: 475 },
  { name: "Thomas Duval", specialite: "Conseil RH", missions: 1, statut: "En mission" as const, tjm_moyen: 520 },
  { name: "Marie Leroy", specialite: "Formation", missions: 1, statut: "En mission" as const, tjm_moyen: 480 },
  { name: "Julie Martin", specialite: "Chasse de tête", missions: 1, statut: "En mission" as const, tjm_moyen: 550 },
  { name: "Alexandre Petit", specialite: "Recrutement", missions: 1, statut: "En mission" as const, tjm_moyen: 400 },
  { name: "Nadia Benali", specialite: "GPEC", missions: 1, statut: "En mission" as const, tjm_moyen: 470 },
  { name: "Lucas Moreau", specialite: "Recrutement retail", missions: 1, statut: "En mission" as const, tjm_moyen: 420 },
  { name: "Claire Dupont", specialite: "Coaching", missions: 0, statut: "Disponible" as const, tjm_moyen: 500 },
];

export const craPreviews = [
  {
    id: "cra-1",
    freelance: "Sophie Marchand",
    client: "Groupama",
    mission: "Recruteuse senior",
    periode: "Mars 2026",
    tjm: 450,
    jours: [2, 3, 4, 5, 6, 9, 10, 11, 12, 13, 16, 17, 18, 19, 20, 23, 24, 25, 26],
    totalJours: 19,
    montantHT: 8550,
    tva: 1710,
    montantTTC: 10260,
    statut: "validé" as const,
    creeLe: "01/04/2026",
    envoiLe: "02/04/2026",
    valideLe: "05/04/2026",
  },
];
