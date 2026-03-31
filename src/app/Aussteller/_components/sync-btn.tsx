"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";

export default function SyncBtn() {
  const updater = api.aussteller.sync.useMutation();

  return (
    <Button onClick={() => updater.mutateAsync()} disabled={updater.isPending}>
      {updater.isPending ? "Synchronisiert..." : "Datenbank Synchronisieren"}
    </Button>
  );
}
