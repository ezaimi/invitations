"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Invitation } from "@/templates/general/v1/types/Invitation";
import SectionSubtitle from "./Subtitle";

const images = [
  "/images/templates/v2/couple1.webp",
  "/images/templates/v2/couple2.jpg",
  "/images/templates/v2/couple2.webp",
  "/images/templates/v2/couple4.jpg",
];

export default function Intro({ data }: { data: Invitation }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

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
          className="text-black text-[53px] sm:text-[64px] font-burgues tracking-[0.05em]"
        >
          {data.bride} & {data.groom}
        </h1>

        <SectionSubtitle className="text-[#60683e]">
          We joyfully invite you to share
          <br />
          in our celebration of love and commitment,
          <br />
          as we begin this new chapter together
          <br />
          surrounded by those who mean the most to us.
        </SectionSubtitle>

        <div
          className="mt-10 text-[28px] sm:text-[36px] tracking-[0.5em] font-suranna"
          style={{ color: "#60683e" }}
        >
          {new Date(data.date).toLocaleDateString("en-GB").replace(/\//g, "-")}
        </div>


      </div>
    </div>


  );
}
