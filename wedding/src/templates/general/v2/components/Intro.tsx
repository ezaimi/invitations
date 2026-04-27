"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import type { Invitation } from "@/templates/general/v1/types/Invitation";
import { formatInvitationDate } from "@/lib/formatInvitationDate";
import SectionSubtitle from "../../../shared/components/RSVP/Subtitle";

const images = [
  "/images/templates/v2/couple1.webp",
  "/images/templates/v2/couple2.jpg",
  "/images/templates/v2/couple2.webp",
  "/images/templates/v2/couple4.jpg",
];

export default function Intro({ data }: { data: Invitation }) {
  const [index, setIndex] = useState(0);
  const [isSubtitleVisible, setIsSubtitleVisible] = useState(false);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const el = nameRef.current;
    if (!el) return;

    const fullName = `${data.bride} & ${data.groom}`;
    el.innerHTML = fullName
      .split("")
      .map((char) =>
        char === " "
          ? `<span class="inline-block opacity-0 translate-y-2.5">&nbsp;</span>`
          : `<span class="inline-block opacity-0 translate-y-2.5">${char}</span>`
      )
      .join("");

    const chars = el.querySelectorAll("span");

    gsap.to(chars, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: "power3.out",
      stagger: 0.1,
      delay: 0.6,
    });

    const t1 = setTimeout(() => setIsSubtitleVisible(true), 600);

    const t2 = setTimeout(() => {
      const dateEl = dateRef.current;
      if (!dateEl) return;

      const numbers = dateEl.querySelectorAll<HTMLElement>("[data-date-num]");
      const dashes = dateEl.querySelectorAll<HTMLElement>("[data-date-dash]");

      gsap.to(numbers, {
        opacity: 1,
        y: 0,
        duration: 1.4,
        ease: "power4.out",
        stagger: 0.3,
      });

      gsap.to(dashes, {
        scaleX: 1,
        duration: 1.1,
        ease: "power4.out",
        stagger: 0.3,
        delay: 0.4,
      });
    }, 600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [data.bride, data.groom]);

  return (
    <div className="relative h-screen flex flex-col justify-center 
    bg-[url('/images/templates/v2/bg.png')]
  bg-cover bg-center ">

      <div className="w-full flex justify-center">

        <div className="relative w-full max-w-[380px] aspect-350/520">
          {/* Ellipse + image (behind) */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="relative w-[70%] h-[60%] rounded-[50%/60%] overflow-hidden border-3 border-transparent mt-2">

              {images.map((src, i) => (
                <Image
                  key={i}
                  src={src}
                  alt="couple"
                  fill
                  className={`absolute inset-0 object-cover transition-all duration-3000 ease-linear
                    ${i === index ? "opacity-100 scale-100" : "opacity-0 scale-100"}`}
                />
              ))}

            </div>
          </div>

          {/* Frame ON TOP */}
          <Image
            src="/images/templates/v2/frameOnly.png"
            alt="frame"
            fill
            className="object-cover z-20 pointer-events-none "
          />

        </div></div>



      {/* TEXT */}
      <div className=" inset-0 flex flex-col items-center justify-center text-center px-4 z-20 ml-7">

        <h1
          ref={nameRef}
          className="text-black text-[53px] sm:text-[64px] font-burgues tracking-[0.05em]"
        />

        <div className={`countdown-reveal ${isSubtitleVisible ? "is-visible" : ""}`}>
          <SectionSubtitle className="text-[#60683e]">
            We joyfully invite you to share
            <br />
            in our celebration of love and commitment,
            <br />
            as we begin this new chapter together
            <br />
            surrounded by those who mean the most to us.
          </SectionSubtitle>
        </div>

        <div
          ref={dateRef}
          className="mt-10 flex items-center text-[28px] sm:text-[36px] tracking-[0.5em] font-suranna overflow-hidden"
          style={{ color: "#60683e" }}
        >
          {formatInvitationDate(data.date)
            .split("-")
            .map((part, i, arr) => (
              <span key={i} className="flex items-center">
                <span
                  data-date-num
                  className="inline-block opacity-0 translate-y-4"
                >
                  {part}
                </span>
                {i < arr.length - 1 && (
                  <span
                    data-date-dash
                    className="inline-block mx-[0.1em] opacity-100 scale-x-0 origin-left"
                  >
                    -
                  </span>
                )}
              </span>
            ))}
        </div>


      </div>
    </div>


  );
}
