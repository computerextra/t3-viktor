"use client";

import { TITLE } from "@/app/_components/Navigation";
import React from "react";

export default function useTitle(title: string | undefined) {
  React.useEffect(() => {
    if (title) {
      document.title = title + " · " + TITLE;
    } else {
      document.title = TITLE;
    }
  }, [title]);
}
