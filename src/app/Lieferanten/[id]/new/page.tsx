import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AnsprechpartnerForm from "../_components/ansprechpartner-form";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="container mx-auto">
      <Card className="mt-5">
        <CardHeader>
          <CardTitle>Neuen Ansprechpartner anlegen</CardTitle>
        </CardHeader>
        <CardContent>
          <AnsprechpartnerForm ansprechpartner={undefined} lieferantenId={id} />
        </CardContent>
      </Card>
    </div>
  );
}
