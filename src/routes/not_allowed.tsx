import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/not_allowed")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>Mit diesem Account ist eine Ansicht der Seite nicht möglich!</div>
  );
}
