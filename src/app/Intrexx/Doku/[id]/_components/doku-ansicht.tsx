"use client";

import { api } from "@/trpc/react";

export default function DokuAnsicht({ id }: { id: number }) {
  const data = api.intrexx_doku.get.useQuery({ id });

  return <></>;
}
