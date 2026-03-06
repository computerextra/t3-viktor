"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "./ui/empty";
import { Spinner } from "./ui/spinner";

export default function LoadingSkeleton({ desc }: { desc: string }) {
  const router = useRouter();
  return (
    <Empty className="w-full">
      <EmptyHeader>
        <EmptyMedia variant={"icon"}>
          <Spinner className="size-20" />
        </EmptyMedia>
        <EmptyTitle>{desc}</EmptyTitle>
        <EmptyDescription>Bitte warten...</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline" size="sm" onClick={() => router.back()}>
          Abbrechen
        </Button>
      </EmptyContent>
    </Empty>
  );
}
