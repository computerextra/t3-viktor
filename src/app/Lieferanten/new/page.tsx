"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LieferantForm from "../_components/lieferanten-form";

export default function page() {
  return (
    <div className="container mx-auto">
      <Card className="mt-5">
        <CardHeader>
          <CardTitle>Neuen Lieferanten anlegen</CardTitle>
        </CardHeader>
        <CardContent>
          <LieferantForm lieferant={undefined} />
        </CardContent>
      </Card>
    </div>
  );
}
