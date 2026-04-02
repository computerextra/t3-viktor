"use client";

import { PaginatedDataTable } from "@/components/data-table";
import LoadingSkeleton from "@/components/loading-skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { api } from "@/trpc/react";
import {
  DruckerColumns,
  EmailColumns,
  KontenColumns,
  NetzwerkgeräteColumns,
  ServerColumns,
  SoftwareColumns,
  SonstigesColumns,
  WorkstationColumns,
  ZugangsdatenColumns,
} from "./columns";

export default function Seite1({ id }: { id: number }) {
  const server = api.intrexx_doku.getServer.useQuery({ id });
  const workstations = api.intrexx_doku.workstations.useQuery({ id });
  const konten = api.intrexx_doku.konten.useQuery({ id });
  const software = api.intrexx_doku.software.useQuery({ id });
  const email = api.intrexx_doku.email.useQuery({ id });
  const drucker = api.intrexx_doku.drucker.useQuery({ id });
  const netzwerkgeräte = api.intrexx_doku.netzwerkgeräte.useQuery({ id });
  const zugangsdaten = api.intrexx_doku.zugangsdaten.useQuery({ id });
  const sonstiges = api.intrexx_doku.sonstiges.useQuery({ id });

  return (
    <Card>
      <CardContent>
        <div className="grid grid-cols-3 gap-8">
          <div>
            <h3 className="text-center">Server</h3>
            {server.isLoading ? (
              <LoadingSkeleton desc="Server laden..." />
            ) : (
              <PaginatedDataTable
                columns={ServerColumns}
                data={server.data ?? []}
              />
            )}
          </div>
          <div>
            <h3 className="text-center">Worstations</h3>
            {workstations.isLoading ? (
              <LoadingSkeleton desc="Workstations laden..." />
            ) : (
              <PaginatedDataTable
                columns={WorkstationColumns}
                data={workstations.data ?? []}
              />
            )}
          </div>
          <div>
            <h3 className="text-center">Konten</h3>
            {konten.isLoading ? (
              <LoadingSkeleton desc="Konten laden..." />
            ) : (
              <PaginatedDataTable
                columns={KontenColumns}
                data={konten.data ?? []}
              />
            )}
          </div>
          <div>
            <h3 className="text-center">Software</h3>
            {software.isLoading ? (
              <LoadingSkeleton desc="Software lädt..." />
            ) : (
              <PaginatedDataTable
                columns={SoftwareColumns}
                data={software.data ?? []}
              />
            )}
          </div>
          <div>
            <h3 className="text-center">E-Mail</h3>
            {email.isLoading ? (
              <LoadingSkeleton desc="E-Mails laden..." />
            ) : (
              <PaginatedDataTable
                columns={EmailColumns}
                data={email.data ?? []}
              />
            )}
          </div>
          <div>
            <h3 className="text-center">Drucker</h3>
            {drucker.isLoading ? (
              <LoadingSkeleton desc="Drucker laden..." />
            ) : (
              <PaginatedDataTable
                columns={DruckerColumns}
                data={drucker.data ?? []}
              />
            )}
          </div>
          <div>
            <h3 className="text-center">Netzwerkgeräte</h3>
            {netzwerkgeräte.isLoading ? (
              <LoadingSkeleton desc="Netzwerkgeräte laden..." />
            ) : (
              <PaginatedDataTable
                columns={NetzwerkgeräteColumns}
                data={netzwerkgeräte.data ?? []}
              />
            )}
          </div>
          <div>
            <h3 className="text-center">Zugangsdaten</h3>
            {zugangsdaten.isLoading ? (
              <LoadingSkeleton desc="Zugangsdaten laden..." />
            ) : (
              <PaginatedDataTable
                columns={ZugangsdatenColumns}
                data={zugangsdaten.data ?? []}
              />
            )}
          </div>
          <div>
            <h3 className="text-center">Sonstiges</h3>
            {sonstiges.isLoading ? (
              <LoadingSkeleton desc="Sonstiges lädt..." />
            ) : (
              <PaginatedDataTable
                columns={SonstigesColumns}
                data={sonstiges.data ?? []}
              />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
