"use client";
import { useState } from "react";

export default function RSVP() {
  const [guests, setGuests] = useState(1);

  return (
    <section className="px-6 py-10">
      <h2 className="text-xl font-semibold text-center">RSVP</h2>

      <form className="mt-6 space-y-4">
        <select className="w-full p-3 rounded border">
          <option>Приду</option>
          <option>Не смогу</option>
        </select>

        <input
          type="number"
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          className="w-full p-3 rounded border"
        />

        <textarea
          placeholder="Сообщение"
          className="w-full p-3 rounded border"
        />

        <button className="w-full bg-[#6b8fbf] text-white py-3 rounded">
          Отправить
        </button>
      </form>
    </section>
  );
}