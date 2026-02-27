import { db } from "@/db";
import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";

export const GeburtstagsQueryOptions = () =>
  queryOptions({
    queryKey: ["Geburtstag"],
    queryFn: () => getGeburtstage(),
  });

export const MitarbeiterListeQueryOptions = () =>
  queryOptions({
    queryKey: ["Mitarbeiter"],
    queryFn: () => getMitarbeiterListe(),
  });

export const getMitarbeiterListe = createServerFn({ method: "GET" }).handler(
  async () => {
    const ma = await db.mitarbeiter.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    return ma;
  },
);

export const getGeburtstage = createServerFn({ method: "GET" }).handler(
  async () => {
    const ma = await db.mitarbeiter.findMany({
      where: {
        NOT: [
          {
            Geburtstag: null,
          },
        ],
      },
      orderBy: {
        Geburtstag: "asc",
      },
    });
    if (ma.length < 1) return null;

    // Sort Mitarbeiter
    type maGeb = {
      id: string;
      name: string;
      geb: Date;
      diff: number;
    };
    const heute: maGeb[] = [];
    const zukunft: maGeb[] = [];
    const vergangen: maGeb[] = [];

    const today = new Date();
    const year = today.getFullYear();

    ma.forEach((x) => {
      if (x.Geburtstag == null) return;
      const g = new Date(
        year,
        x.Geburtstag.getMonth(),
        x.Geburtstag.getDate(),
        0,
        0,
        0,
        0,
      );
      const diffMs = g.getTime() - today.getTime();
      const diffDays = Math.floor(diffMs / 86400000) + 1;
      const y: maGeb = {
        id: x.id,
        name: x.name,
        geb: g,
        diff: diffDays,
      };
      if (diffDays > 0) zukunft.push(y);
      else if (diffDays < 0) vergangen.push(y);
      else heute.push(y);
    });

    heute.sort((a, b) => a.diff - b.diff);
    zukunft.sort((a, b) => a.diff - b.diff);
    vergangen.sort((a, b) => a.diff - b.diff);

    return { heute, zukunft, vergangen };
  },
);
