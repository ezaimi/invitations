"use client";

import { useState } from "react";
import SectionTitle from "./Header";
import SectionSubtitle from "./Subtitle";
import { User, Mail, Plus, Minus } from "lucide-react";

export default function RSVP() {
  const [guests, setGuests] = useState(1);

  return (
    <section className="w-full bg-[#f3f1e6] flex flex-col items-center pt-14 pb-20 text-center">

      {/* Header */}
      <div className="px-6 max-w-[700px]">
        <SectionTitle>JOIN US</SectionTitle>

        <SectionSubtitle className="text-[#60683e]">
          Please be so kind as to confirm your attendance
          <br />
        no later than May 1st, so that we can make the necessary arrangements
          and plan accordingly for all our guests.
        </SectionSubtitle>
      </div>

      {/* Form */}
      <div className="mt-10 w-full max-w-[600px] px-6 flex flex-col gap-6">

        {/* Name */}
        <div className="flex items-center bg-[#a8a585]/70 rounded-full px-4 py-4">
          <div className="bg-[#60683e] p-3 rounded-full mr-4">
            <User className="text-white w-5 h-5" />
          </div>
          <input
            type="text"
            placeholder="Full Name"
            className="bg-transparent outline-none w-full text-gray-700 placeholder-gray-600"
          />
        </div>

        {/* Email */}
        <div className="flex items-center bg-[#a8a585]/70 rounded-full px-4 py-4">
          <div className="bg-[#60683e] p-3 rounded-full mr-4">
            <Mail className="text-white w-5 h-5" />
          </div>
          <input
            type="email"
            placeholder="e-mail address"
            className="bg-transparent outline-none w-full text-gray-700 placeholder-gray-600"
          />
        </div>

        {/* Guests */}
        <div className="flex items-center justify-between mt-4">

          <p className="text-[#60683e] text-left max-w-[55%] text-[12px] ml-4 font-belleza">
            Please indicate the total number of people, including yourself and
            all family members or guests.
          </p>

          <div className="flex items-center bg-[#a8a585]/70 rounded-full px-4 py-3 gap-4">
            <button
              onClick={() => setGuests((g) => Math.max(1, g - 1))}
              className="bg-[#60683e] text-white w-8 h-8 rounded-full flex items-center justify-center"
            >
              <Minus size={16} />
            </button>

            <span className="text-[18px] font-belleza">{guests}</span>

            <button
              onClick={() => setGuests((g) => g + 1)}
              className="bg-[#60683e] text-white w-8 h-8 rounded-full flex items-center justify-center"
            >
              <Plus size={16} />
            </button>
          </div>

        </div>

        {/* Buttons */}
        <div className="flex flex-row sm:flex-row gap-3 mt-8 w-full">
          <button className="w-full bg-[#60683e] text-white py-4 rounded-full text-[18px] font-belleza">
            Joyfully Accept
          </button>

          <button className="w-full bg-[#60683e] text-white py-4 rounded-full text-[18px] font-belleza">
            Gracefully Decline
          </button>
        </div>

      </div>

    </section>
  );
}