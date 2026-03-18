import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import JobForm from "../_components/form";

export default function Page() {
  return (
    <div className="container mx-auto">
      <Card className="mt-5">
        <CardHeader>
          <CardTitle>Neuen Job anlegen</CardTitle>
        </CardHeader>
        <CardContent>
          <JobForm job={undefined} />
        </CardContent>
      </Card>
    </div>
  );
}
