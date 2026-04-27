"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import SectionTitle from "../../../shared/components/RSVP/Header";
import SectionSubtitle from "../../../shared/components/RSVP/Subtitle";

type PlateDetailsProps = {
  plateSrc?: string;
};

export default function PlateDetails({
  plateSrc = "/images/plate.png",
}: PlateDetailsProps) {
  const subtitleRef = useRef<HTMLDivElement>(null);
  const [isSubtitleVisible, setIsSubtitleVisible] = useState(false);

  useEffect(() => {
    const subtitle = subtitleRef.current;
    if (!subtitle) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setIsSubtitleVisible(true);
        observer.disconnect();
      },
      { threshold: 0.2 }
    );

    observer.observe(subtitle);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="w-full bg-[#f3f1e6] flex flex-col items-center pt-14 pb-10 text-center overflow-hidden">

      <SectionTitle animate className="mt-10">
        Wedding Details
      </SectionTitle>

      <div
        ref={subtitleRef}
        className={`countdown-reveal ${isSubtitleVisible ? "is-visible" : ""}`}
      >
        <SectionSubtitle className="text-[#60683e]">
          Kindly reserve this date for our 
          <br />
          wedding celebration
        </SectionSubtitle>
      </div>


      <div className="relative mt-7 w-full max-w-[620px] h-[320px] sm:h-[500px]  ">
        <Image
          src="/images/templates/v2/plate.png"
          alt="Wedding plate"
          fill
          className="object-contain "
          priority
        />
      </div>


    </section>
  );
}
