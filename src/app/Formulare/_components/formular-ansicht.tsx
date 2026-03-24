"use client";

import type { Formular } from "./formular-auswahl";

// TODO: Form erstellen!

export default function FormularAnsicht({ auswahl }: { auswahl: Formular }) {
  return <div>{auswahl.label}</div>;
}
