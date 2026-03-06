"use client";

import React from "react";

import { TITLE } from "@/app/_components/Navigation";

export default function useTitle(title: string | undefined) {
  React.useEffect(() => {
    if (title) {
      document.title = title + " · " + TITLE;
    } else {
      document.title = TITLE;
    }
  }, [title]);
}
