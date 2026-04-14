"use client";

import AlleArtikel from "./alle-artikel";
import KategorieArtikel from "./kategorie-artikel";

export default function ArtikelListe({ id }: { id?: number }) {
  if (id) {
    return <KategorieArtikel id={id} />;
  } else {
    return <AlleArtikel />;
  }
}
