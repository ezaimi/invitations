"use client";

import Image from "next/image";
import SectionTitle from "./Header";

type StoryProps = {
  patternSrc?: string;
};

export default function Story({
  patternSrc = "/images/templates/v2/pattern.svg",
}: StoryProps) {
  return (
    <section className="relative w-full h-[600px] sm:h-[650px] flex items-center justify-center text-center overflow-hidden bg-[#f3f1e6]">

      {/* Pattern Background */}
      <div className="absolute inset-0">
        <Image
          src={patternSrc}
          alt="Pattern"
          fill
          className="object-cover object-center scale-130"
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-6">

        <SectionTitle className="text-black">
          OUR
          <br />
          STORY
        </SectionTitle>

        <button className="bg-black text-white px-10 py-3 rounded-full text-[16px] font-belleza">
          Explore
        </button>

      </div>

    </section>
  );
}