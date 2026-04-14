"use client";

import Image from "next/image";

type PlateDetailsProps = {
  plateSrc?: string;
};

export default function PlateDetails({
  plateSrc = "/images/plate.png",
}: PlateDetailsProps) {
  return (
    <section className="w-full bg-[#eeece3] flex flex-col items-center px-6 pt-14 pb-10 text-center overflow-hidden">
      <h2 className="font-serif text-[3.6rem] sm:text-[4.5rem] md:text-[5.5rem] leading-none tracking-[-0.04em] text-[#111111] font-serenity">
        WEDDING DETAILS
      </h2>

      <p className="mt-10 max-w-[320px] text-[1.05rem] sm:text-[1.15rem] leading-[1.35] text-[#7b7c59]">
        Kindly reserve this date for our wedding celebration
      </p>

      <div className="relative mt-16 w-full max-w-[620px] h-[430px] sm:h-[500px]">
        <Image
          src="/images/templates/v2/plate.png"
          alt="Wedding plate"
          fill
          className="object-contain"
          priority
        />
      </div>

     
    </section>
  );
}