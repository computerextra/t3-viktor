"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { api } from "@/trpc/react";
import { useHotkey } from "@tanstack/react-hotkeys";
import { useRouter } from "next/navigation";
import { useState } from "react";
import MitarbeiterForm from "../../_components/mitarbeiter-form";

export default function MitarbeiterCard({ id }: { id: string }) {
  const [data] = api.mitarbeiter.getWithAbteilung.useSuspenseQuery({ id });

  const [showAlert, setShowAlert] = useState(false);

  useHotkey("Shift+Backspace", () => setShowAlert(true));

  const utils = api.useUtils();
  const router = useRouter();
  const handleDelete = api.mitarbeiter.delete.useMutation({
    onSuccess: async () => {
      // Invalidate everything with a "Mitarbeiter"
      await utils.mitarbeiter.get.invalidate();
      await utils.mitarbeiter.getAll.invalidate();
      await utils.mitarbeiter.geburtstage.invalidate();
      await utils.mitarbeiter.getWithAbteilung.invalidate();
      await utils.einkauf.einkaufsliste.invalidate();

      router.push("/Mitarbeiter");
    },
  });

  return (
    <>
      <Card className="mt-5">
        <CardHeader>
          <CardTitle>{data?.name}</CardTitle>
          <CardDescription>{data?.Abteilung?.name}</CardDescription>
        </CardHeader>
        <CardContent>
          <MitarbeiterForm mitarbeiter={data} />
        </CardContent>
      </Card>
      <AlertDialog
        defaultOpen={false}
        onOpenChange={(e) => setShowAlert(!e)}
        open={showAlert}
      >
        <AlertDialogTrigger asChild>
          <span className="sr-only">Dialog Trigger</span>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{data?.name} wirklich löschen?</AlertDialogTitle>
            <AlertDialogDescription>
              Diese Aktion kann nicht Rückgängig gemacht werden!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => handleDelete.mutateAsync({ id })}
            >
              Löschen
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
