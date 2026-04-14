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
import { Kbd } from "@/components/ui/kbd";
import { api } from "@/trpc/react";
import { formatForDisplay, useHotkey } from "@tanstack/react-hotkeys";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LieferantForm from "../../_components/lieferanten-form";

export default function LieferantCard({ id }: { id: string }) {
  const [data] = api.lieferant.get.useSuspenseQuery({ id });

  const [showAlert, setShowAlert] = useState(false);

  const utils = api.useUtils();
  const router = useRouter();
  const handleDelete = api.lieferant.delete.useMutation({
    onSuccess: async () => {
      // Invalidate everything with a "Lieferant"
      await utils.lieferant.get.invalidate();
      await utils.lieferant.getAll.invalidate();
      await utils.lieferant.getAllWithAp.invalidate();

      router.push("/Lieferanten");
    },
  });

  useHotkey("Shift+Backspace", () => setShowAlert(true));
  useHotkey("Shift+N", () => router.push(`/Lieferanten/${id}/new`));

  return (
    <>
      <Card className="mt-5">
        <CardHeader>
          <CardTitle>{data?.Firma}</CardTitle>
          <CardDescription>
            <Kbd>{formatForDisplay("Shift+N")}</Kbd>: Neuer AP
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LieferantForm lieferant={data} />
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
            <AlertDialogTitle>{data?.Firma} wirklich löschen?</AlertDialogTitle>
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
