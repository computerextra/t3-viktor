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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/trpc/react";
import { useHotkey } from "@tanstack/react-hotkeys";
import { useRouter } from "next/navigation";
import { useState } from "react";
import JobForm from "./form";

export default function JobCard({ id }: { id: string }) {
  const [data] = api.job.get.useSuspenseQuery({ id });

  const [showAlert, setShowAlert] = useState(false);

  useHotkey("Shift+Backspace", () => setShowAlert(true));

  const utils = api.useUtils();
  const router = useRouter();
  const handleDelete = api.job.delete.useMutation({
    onSuccess: async () => {
      // Invalidate everything with a "Mitarbeiter"
      await utils.job.get.invalidate();
      await utils.job.getAll.invalidate();

      router.push("/CMS/Job");
    },
  });

  return (
    <>
      <Card className="mt-5">
        <CardHeader>
          <CardTitle>{data?.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <JobForm job={data} />
        </CardContent>
      </Card>
      <AlertDialog onOpenChange={(e) => setShowAlert(!e)} open={showAlert}>
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
            <AlertDialogCancel onClick={() => setShowAlert(false)}>
              Cancel
            </AlertDialogCancel>
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
