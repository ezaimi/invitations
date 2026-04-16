"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import SectionTitle from "./Header";

type StoryProps = {
  patternSrc?: string;
};

const PHOTOS = [
  { src: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&q=80", alt: "Couple embracing by the sea", className: "col-span-2 row-span-1" },
  { src: "https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=800&q=80", alt: "Couple holding hands",        className: "col-span-1 row-span-2" },
  { src: "https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=800&q=80", alt: "Couple celebrating",          className: "col-span-1 row-span-1" },
  { src: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800&q=80", alt: "Couple in forest",            className: "col-span-1 row-span-1" },
  { src: "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=800&q=80", alt: "Couple by window",            className: "col-span-2 row-span-1" },
  { src: "https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=800&q=80", alt: "Couple on bench",             className: "col-span-1 row-span-1" },
];

export default function Story({
  patternSrc = "/images/templates/v2/pattern.svg",
}: StoryProps) {
  const [showGallery, setShowGallery] = useState(false);
  const [visiblePhotos, setVisiblePhotos] = useState<boolean[]>(
    new Array(PHOTOS.length).fill(false)
  );
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  };

  const handleExplore = () => {
    clearAllTimeouts();
    setShowGallery(true);

    // Stagger each photo fade-in
    PHOTOS.forEach((_, i) => {
      const t = setTimeout(() => {
        setVisiblePhotos((prev) => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }, 300 + i * 400);
      timeoutsRef.current.push(t);
    });

    // After 5s from last photo appearing, reverse back
    const lastPhotoDelay = 300 + (PHOTOS.length - 1) * 160;
    const resetDelay = lastPhotoDelay + 5000;

    const resetT = setTimeout(() => {
      // Fade photos out in reverse order
      [...PHOTOS].reverse().forEach((_, i) => {
        const t = setTimeout(() => {
          setVisiblePhotos((prev) => {
            const next = [...prev];
            next[PHOTOS.length - 1 - i] = false;
            return next;
          });
        }, i * 120);
        timeoutsRef.current.push(t);
      });

      // After photos fade out, restore the title
      const restoreDelay = PHOTOS.length * 120 + 400;
      const restoreT = setTimeout(() => {
        setShowGallery(false);
        setVisiblePhotos(new Array(PHOTOS.length).fill(false));
      }, restoreDelay);
      timeoutsRef.current.push(restoreT);
    }, resetDelay);

    timeoutsRef.current.push(resetT);
  };

  return (
    <section className="relative w-full h-[600px] sm:h-[650px] flex items-center justify-center text-center overflow-hidden bg-[#f3f1e6]">

      {/* Pattern Background */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${
          showGallery ? "opacity-0" : "opacity-100"
        }`}
      >
        <Image
          src={patternSrc}
          alt="Pattern"
          fill
          className="object-cover object-center scale-130"
          priority
        />
      </div>

      {/* Title + Button */}
      <div
        className={`relative z-10 flex flex-col items-center gap-6 transition-opacity duration-500 ${
          showGallery ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <SectionTitle className="text-black">
          OUR
          <br />
          STORY
        </SectionTitle>

        <button
          onClick={handleExplore}
          className="bg-black text-white px-10 py-3 rounded-full text-[16px] font-belleza"
        >
          Explore
        </button>
      </div>

    </section>
  );
}
