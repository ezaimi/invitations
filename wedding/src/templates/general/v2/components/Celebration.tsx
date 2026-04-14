"use client";

import Image from "next/image";

export default function Celebration() {
  return (
    <section className="relative w-full h-135 sm:h-160 bg-[#60683e] flex flex-col items-center justify-start text-center px-6 py-16 overflow-hidden">

      <h1 className="text-[#ffffff] text-[40px] sm:text-[3.5rem] md:text-[4rem] leading-none font-serenity z-10">
        THE CELEBRATION
      </h1>

      <p className="text-[#ffffff] mt-8 max-w-md text-[13px] leading-[1.1] sm:text-[1.1rem] font-belleza z-10  mx-15">
        Join us as we gather to celebrate love,
        <br />
        connection, and the beginning of a new chapter.
        <br />
        A day thoughtfully planned, filled with meaningful
        moments and shared joy.
      </p>

      <div className="absolute -bottom-18 left-[52%] -translate-x-1/2 w-[180%] h-[200%] overflow-hidden">
      <div className="relative w-full h-full flex items-end justify-center">
                  <Image
            src="/images/templates/v2/whiteflower.png"
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