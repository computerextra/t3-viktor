"use client";

import { useEffect, useRef, useState } from "react";

export default function Clock() {
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const timer = useRef<any | null>(null);

  useEffect(() => {
    const t = new Date();
    setHour(t.getHours());
    setMinute(t.getMinutes());
    setSecond(t.getSeconds());

    timer.current = setInterval(() => {
      setHour(new Date().getHours());
      setMinute(new Date().getMinutes());
      setSecond(new Date().getSeconds());
    }, 1000);

    return () => {
      clearInterval(timer.current);
    };
  }, []);
  return (
    <p className="text-2xl leading-7 not-first:mt-6">
      Heute ist der:{" "}
      {new Date().toLocaleDateString("de-de", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })}{" "}
      - {hour > 9 ? hour : "0" + hour}:{minute > 9 ? minute : "0" + minute}:
      {second > 9 ? second : "0" + second} Uhr
    </p>
  );
}
