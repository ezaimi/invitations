"use client";

import Image from "next/image";
import SectionTitle from "./Header";
import SectionSubtitle from "./Subtitle";

type PlateDetailsProps = {
  plateSrc?: string;
};

export default function PlateDetails({
  plateSrc = "/images/plate.png",
}: PlateDetailsProps) {
  return (
    <section className="w-full bg-[#f3f1e6] flex flex-col items-center pt-14 pb-10 text-center overflow-hidden">

      <SectionTitle className="mt-10">
        Wedding Details
      </SectionTitle>

      <SectionSubtitle className="text-[#60683e]">
        Kindly reserve this date for our 
        <br />
        wedding celebration
      </SectionSubtitle>


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