import type { AppRouter } from "@/server/api/root";
import { ColumnDef } from "@tanstack/react-table";
import type { inferRouterOutputs } from "@trpc/server";

type RouterOutput = inferRouterOutputs<AppRouter>;
type DokuServer = RouterOutput["intrexx_doku"]["getServer"];
type DokuWorkstations = RouterOutput["intrexx_doku"]["workstations"];
type DokuKonten = RouterOutput["intrexx_doku"]["konten"];

export const ServerColumns: ColumnDef<DokuServer[0]>[] = [
  { accessorKey: "STR_NAME_8F4484EF", header: "Name" },
  { accessorKey: "STR_DOMNE_75045D56", header: "Domäne" },
  { accessorKey: "STR_IPADRESSE_83446DE5", header: "IP" },
  { accessorKey: "TXT_SERVERDIENSTE_30C71333", header: "Dienste" },
  { accessorKey: "L_GERTENR_A53AB163", header: "Gerätenummer" },
  //   TODO: Pop Up mit mehr Infos
];

export const WorkstationColumns: ColumnDef<DokuWorkstations[0]>[] = [
  { accessorKey: "STR_NAME_DEDB1FC4", header: "Name" },
  { accessorKey: "STR_STANDARDNUTZER_AD2E367F", header: "Standardnutzer" },
  { accessorKey: "STR_IPADRESSE_C112A916", header: "IP" },
  { accessorKey: "L_GERTENR_4F85C699", header: "Gerätenummer" },
  //   TODO: Pop Up mit mehr Infos
];

export const KontenColumns: ColumnDef<DokuKonten[0]>[] = [
  { accessorKey: "STR_NAME_FFF21E31", header: "Name" },
  { accessorKey: "STR_KONTOART_25F5C306", header: "Kontoart" },
  { accessorKey: "STR_BENUTZERNAME_2B169E30", header: "Benutzername" },
  { accessorKey: "STR_KENNWORT_E5B5481B", header: "Kennwort" },
  //   TODO: Pop Up mit mehr Infos
];
