import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AbteilungForm from "../_components/form";

export default function Page() {
  return (
    <div className="container mx-auto">
      <Card className="mt-5">
        <CardHeader>
          <CardTitle>Neue Abteilung anlegen</CardTitle>
        </CardHeader>
        <CardContent>
          <AbteilungForm abteilung={undefined} />
        </CardContent>
      </Card>
    </div>
  );
}
