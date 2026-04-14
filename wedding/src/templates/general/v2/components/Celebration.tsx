"use client";

import Image from "next/image";
import SectionTitle from "./Header";
import SectionSubtitle from "./Subtitle";

export default function Celebration() {
  return (
    <section className="relative w-full h-128 sm:h-160 bg-[#60683e] flex flex-col items-center justify-start text-center px-6 py-16 overflow-visible">

      <SectionTitle className="text-white"> 
        THE CELEBRATION
      </SectionTitle>


      <SectionSubtitle className="text-white">
        Join us as we gather to celebrate love,
        <br />
        connection, and the beginning of a new chapter.
        <br />
        A day thoughtfully planned, filled with meaningful
        moments and shared joy.
        </SectionSubtitle>

      <div className="absolute -bottom-21 left-[52%] -translate-x-1/2 w-[180%] h-[200%] overflow-hidden">
        <div className="relative w-full h-full flex items-end justify-center">
          <Image
            src="/images/templates/v2/white_flower.png"
            alt="flower"
            width={600}
            height={600}
            className="object-contain "
            priority
          />
        </div>
      </div>
    </section>
  );
}