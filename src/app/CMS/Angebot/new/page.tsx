import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AngebotForm from "../_components/form";

export default function Page() {
  return (
    <div className="container mx-auto">
      <Card className="mt-5">
        <CardHeader>
          <CardTitle>Neues Angebot anlegen</CardTitle>
        </CardHeader>
        <CardContent>
          <AngebotForm angebot={undefined} />
        </CardContent>
      </Card>
    </div>
  );
}
