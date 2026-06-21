// AUTOGENERADO por scripts/sync-sedes.mjs — NO editar a mano.
// Fuente: editor/data/acropolis/published.json (sedes publicadas del sitio principal).
// Regenerar con: npm run sedes:sync

export type SyncedSede = {
  id: string;
  name: string;
  zone: string;
  city: string;
  address: string;
  reference?: string;
  mapsQuery: string;
};

export const PRINCIPAL_SEDES: SyncedSede[] = [
  {
    id: "sede-naco",
    name: "Sede Naco",
    zone: "Ens. Naco",
    city: "Santo Domingo",
    address: "Calle Cub Scouts No. 6, 3er nivel",
    reference: "Antes de Av. Tiradentes, detrás de Plaza Merengue",
    mapsQuery: "Calle Cub Scouts 6 Naco Santo Domingo República Dominicana",
  },
  {
    id: "sede-los-prados",
    name: "Sede Los Prados",
    zone: "Los Prados",
    city: "Santo Domingo",
    address: "Eugenio Deschamps No. 81",
    reference: "Plaza Los Prados",
    mapsQuery: "Eugenio Deschamps 81 Los Prados Santo Domingo República Dominicana",
  },
];
