"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { api } from "@/trpc/react";
import Link from "next/link";
import { useState } from "react";

export default function MitarbeiterDialog() {
  const res = api.mitarbeiter.getAll.useQuery();
  const data = res.data;

  const [selected, setSelected] = useState<string | null>(null);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg">Eingabe</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Einkauf eingeben</DialogTitle>
          <DialogDescription>
            Deinen Namen auswählen und weiter klicken
          </DialogDescription>
        </DialogHeader>
        {res.isLoading ? (
          <p>Lade Mitarbeiter...</p>
        ) : (
          <Select onValueChange={(e) => setSelected(e)}>
            <SelectTrigger>
              <SelectValue placeholder="Bitte wählen..." />
            </SelectTrigger>
            <SelectContent position={"item-aligned"}>
              <SelectGroup>
                {data?.map((mitarbeiter) => (
                  <SelectItem key={mitarbeiter.id} value={mitarbeiter.id}>
                    {mitarbeiter.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}

        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"outline"}>Abbrechen</Button>
          </DialogClose>
          <Button asChild disabled={selected == null || selected == "null"}>
            <Link href={`/Einkauf/${selected}`}>Zur Eingabe</Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
