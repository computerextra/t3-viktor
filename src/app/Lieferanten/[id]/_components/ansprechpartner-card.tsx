"use client";

import { api } from "@/trpc/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
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
import { useRouter } from "next/navigation";
import { useHotkey } from "@tanstack/react-hotkeys";
import AnsprechpartnerForm from "./ansprechpartner-form";

export default function AnsprechpartnerCard({
  id,
  lieferantenId,
}: {
  id: string;
  lieferantenId: string;
}) {
  const [data] = api.ansprechpartner.get.useSuspenseQuery({ id });

  const [showAlert, setShowAlert] = useState(false);

  const utils = api.useUtils();
  const router = useRouter();
  const handleDelete = api.ansprechpartner.delete.useMutation({
    onSuccess: async () => {
      // Invalidate everything with a "Lieferant"
      await utils.lieferant.getAllWithAp.invalidate();

      router.push("/Lieferanten");
    },
  });

  useHotkey("Shift+Backspace", () => setShowAlert(true));

  return (
    <>
      <Card className="mt-5">
        <CardHeader>
          <CardTitle>{data?.name}</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <AnsprechpartnerForm
            ansprechpartner={data}
            lieferantenId={lieferantenId}
          />
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
