"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import SectionTitle from "./Header";
import SectionSubtitle from "./Subtitle";

type EndSectionProps = {
  bgSrc?: string;
};

export default function EndSection({
  bgSrc = "/images/templates/v2/flowers.png",
}: EndSectionProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry?.isIntersecting) return;
        setIsVisible(true);
        observer.disconnect();
      },
      { threshold: 0.3 }
    );

    observer.observe(content);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative w-full h-[300px] sm:h-[650px] flex items-center justify-center text-center overflow-hidden">

      {/* Background */}
      <Image
        src="/images/templates/v2/end.png"
        alt="Background"
        fill
        className="object-cover"
        priority
      />

      {/* Overlay (optional for readability) */}
      <div className="absolute inset-0 bg-white/30" />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 px-6 max-w-[700px] flex flex-col items-center"
      >

        <SectionTitle
          className={`text-black countdown-reveal ${isVisible ? "is-visible" : ""}`}
        >
          WITH LOVE
        </SectionTitle>

        <SectionSubtitle
          className={`text-[#60683e] mt-6 countdown-reveal ${isVisible ? "is-visible" : ""}`}
        >
          We are so grateful to share this special moment with you.
          <br />
          Your presence means more to us than words can express.
        </SectionSubtitle>

      </div>

    </section>
  );
}
