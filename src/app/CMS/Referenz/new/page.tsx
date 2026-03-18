import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ReferenzForm from "../_components/form";

export default function Page() {
  return (
    <div className="container mx-auto">
      <Card className="mt-5">
        <CardHeader>
          <CardTitle>Neuen Partner anlegen</CardTitle>
        </CardHeader>
        <CardContent>
          <ReferenzForm referenz={undefined} />
        </CardContent>
      </Card>
    </div>
  );
}
