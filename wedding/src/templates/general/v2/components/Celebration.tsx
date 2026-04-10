"use client";

import Image from "next/image";

export default function Celebration() {
  return (
    <section className="relative w-full h-[40rem] bg-[#60683e] flex flex-col items-center justify-start text-center px-6 py-16 overflow-hidden">
      
      <h1 className="text-[#F5F1E8] text-[3rem] sm:text-[3.5rem] md:text-[4rem] leading-none font-serenity z-10">
        THE CELEBRATION
      </h1>

      <p className="text-[#F5F1E8] mt-8 max-w-md text-[1rem] sm:text-[1.1rem] leading-relaxed font-belleza z-10">
        Join us as we gather to celebrate love,
        connection, and the beginning of a new chapter.
        A day thoughtfully planned, filled with meaningful
        moments and shared joy.
      </p>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[270%] h-[120%]">
        <Image
          src="/images/templates/v2/white_flower.png"
          alt="flower"
          fill
          priority
          className="object-contain object-bottom"
        />
      </div>
    </section>
  );
}