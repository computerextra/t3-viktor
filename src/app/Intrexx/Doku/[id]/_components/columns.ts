import type { AppRouter } from "@/server/api/root";
import { ColumnDef } from "@tanstack/react-table";
import type { inferRouterOutputs } from "@trpc/server";

type RouterOutput = inferRouterOutputs<AppRouter>;
type DokuServer = RouterOutput["intrexx_doku"]["getServer"];
type DokuWorkstations = RouterOutput["intrexx_doku"]["workstations"];
type DokuKonten = RouterOutput["intrexx_doku"]["konten"];
type DokuSoftware = RouterOutput["intrexx_doku"]["software"];
type DokuEmails = RouterOutput["intrexx_doku"]["email"];
type DokuDrucker = RouterOutput["intrexx_doku"]["drucker"];
type DokuNetzwerkgeräte = RouterOutput["intrexx_doku"]["netzwerkgeräte"];
type DokuZugangsdaten = RouterOutput["intrexx_doku"]["zugangsdaten"];
type DokuSonstiges = RouterOutput["intrexx_doku"]["sonstiges"];

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

export const SoftwareColumns: ColumnDef<DokuSoftware[0]>[] = [
  { accessorKey: "STR_BEZEICHNUNG_CDC647B9", header: "Bezeichnung" },
  { accessorKey: "TXT_SERVER_BF0068DC", header: "Server" },
  { accessorKey: "TXT_WORKSTATIONS_0D05B97D", header: "Wokstations" },
  //   TODO: Pop Up mit mehr Infos
];

export const EmailColumns: ColumnDef<DokuEmails[0]>[] = [
  { accessorKey: "STR_EMAILADRESSE_1EA5B191", header: "E-Mail" },
  { accessorKey: "STR_ANMELDENAME_7B82FEE6", header: "Anmeldename" },
  { accessorKey: "STR_KENNWORT_B9B3C27F", header: "Kennwort" },
  //   TODO: Pop Up mit mehr Infos
];

export const DruckerColumns: ColumnDef<DokuDrucker[0]>[] = [
  { accessorKey: "STR_MODELL_67B0B40E", header: "Modell" },
  { accessorKey: "STR_ANSCHLUSSART_F75AD7D2", header: "Anschluss" },
  { accessorKey: "STR_IPADRESSE_BCEA9C26", header: "IP" },
  { accessorKey: "STR_STANDORT_917A167A", header: "Standort" },
  //   TODO: Pop Up mit mehr Infos
];

export const NetzwerkgeräteColumns: ColumnDef<DokuNetzwerkgeräte[0]>[] = [
  { accessorKey: "STR_BEZEICHNUNG_EA6D28B2", header: "Bezeichnung" },
  { accessorKey: "STR_IPADRESSE_C56DEAB6", header: "IP" },
  { accessorKey: "STR_STANDORT_45CC8D89", header: "Standort" },
  //   TODO: Pop Up mit mehr Infos
];

export const ZugangsdatenColumns: ColumnDef<DokuZugangsdaten[0]>[] = [
  { accessorKey: "STR_BEZEICHNUNG_2863B413", header: "Bezeichnung" },
  { accessorKey: "TXT_BEMERKUNG_E8B73E6B", header: "Bemerkung" },
  //   TODO: Pop Up mit mehr Infos
];

export const SonstigesColumns: ColumnDef<DokuSonstiges[0]>[] = [
  { accessorKey: "STR_BESCHREIBUNG_CE8A52EF", header: "Beschreibung" },
  { accessorKey: "TXT_BEMERKUNG_15AFD3BC", header: "Bemerkung" },
  //   TODO: Pop Up mit mehr Infos
];
