"use client";
import { useEffect, useState } from "react";

export default function Countdown() {
  const target = new Date("2026-08-15T16:00:00");

  const [time, setTime] = useState(0);

  useEffect(() => {
    const i = setInterval(() => {
      setTime(target.getTime() - new Date().getTime());
    }, 1000);
    return () => clearInterval(i);
  }, []);

  const days = Math.floor(time / (1000 * 60 * 60 * 24));

  return (
    <section className="px-6 py-8 text-center">
      <h2 className="text-xl font-semibold">До свадьбы осталось</h2>
      <p className="mt-4 text-3xl">{days} дней</p>
    </section>
  );
}