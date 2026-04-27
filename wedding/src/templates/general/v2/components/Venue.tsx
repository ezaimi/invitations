"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import SectionTitle from "../../../shared/components/RSVP/Header";
import SectionSubtitle from "../../../shared/components/RSVP/Subtitle";

type VenueProps = {
  imageSrc?: string;
};

export default function Venue({
  imageSrc = "/images/templates/v2/venue.png",
}: VenueProps) {
  const subtitleRef = useRef<HTMLParagraphElement>(null);
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
    <section className="w-full bg-[#f3f1e6] flex flex-col items-center pt-14 pb-16 text-center overflow-hidden">

      {/* Text */}
      <div className="flex flex-col items-center -mb-2">
        <SectionTitle animate>
          THE VENUE
        </SectionTitle>

        <div
          ref={subtitleRef}
          className={`countdown-reveal ${isSubtitleVisible ? "is-visible" : ""}`}
        >
          <SectionSubtitle className="text-[#60683e] -mb-3">
            Set in a beautiful and carefully chosen location, our wedding will
            <br />
            unfold in a place filled with charm, elegance, and meaning.
          </SectionSubtitle>
        </div>
      </div>

      {/* Image */}
      <div className="relative mt-12 w-full h-[500px] sm:h-[700px]">
        <Image
          src={imageSrc}
          alt="Venue"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Button */}
      <div className="mt-[-30px] z-10">
        <button className="bg-black text-white px-10 py-3 rounded-full text-[16px] font-belleza">
          Map
        </button>
      </div>

    </section>
  );
}
