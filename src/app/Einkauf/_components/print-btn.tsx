"use client";

import { Button } from "@/components/ui/button";

export default function PrintBtn() {
  return (
    <Button
      className="cursor-pointer"
      size="lg"
      onClick={() => {
        if (typeof window !== undefined) {
          window.print();
        }
      }}
    >
      Drucken
    </Button>
  );
}
