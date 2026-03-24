"use client";

import { api } from "@/trpc/react";
import { Dispatch, SetStateAction, useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Spinner } from "@/components/ui/spinner";
import type { Kunde } from "./formular-auswahl";

export default function KundendatenSuche({
  setKunde,
}: {
  setKunde: Dispatch<SetStateAction<Kunde | null>>;
}) {
  const [kundennummer, setKundennummer] = useState<string | undefined>(
    undefined,
  );

  const search = api.sage_kunden.get.useMutation({
    onSuccess: async (res) => {
      setKunde(res);
    },
  });

  return (
    <InputGroup className="w-full max-w-60 print:hidden">
      <InputGroupInput
        defaultValue={kundennummer}
        onChange={(e) => setKundennummer(e.target.value)}
        placeholder="Kundennummer"
      />
      <InputGroupAddon align="inline-end">
        <InputGroupButton
          disabled={kundennummer == null}
          onClick={async () =>
            search.mutateAsync({ kundennummer: kundennummer! })
          }
          variant="secondary"
        >
          {search.isPending ? (
            <>
              Sucht...
              <Spinner />
            </>
          ) : (
            "Suche"
          )}
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
}
