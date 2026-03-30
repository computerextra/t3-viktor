"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MitarbeiterForm from "../_components/mitarbeiter-form";

export default function page() {
  return (
    <div className="container mx-auto">
      <Card className="mt-5">
        <CardHeader>
          <CardTitle>Neuen Mitarbeiter anlegen</CardTitle>
        </CardHeader>
        <CardContent>
          <MitarbeiterForm mitarbeiter={undefined} />
        </CardContent>
      </Card>
    </div>
  );
}
