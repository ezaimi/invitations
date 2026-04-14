"use client";

import Image from "next/image";
import SectionTitle from "./Header";
import SectionSubtitle from "./Subtitle";

type VenueProps = {
  imageSrc?: string;
};

export default function Venue({
  imageSrc = "/images/templates/v2/venue.png",
}: VenueProps) {
  return (
    <section className="w-full bg-[#f3f1e6] flex flex-col items-center pt-14 pb-16 text-center overflow-hidden">

      {/* Text */}
      <div className="flex flex-col items-center">
        <SectionTitle>
          THE VENUE
        </SectionTitle>

        <SectionSubtitle className="text-[#60683e]">
          Set in a beautiful and carefully chosen location, our wedding will
          <br />
          unfold in a place filled with charm, elegance, and meaning.
        </SectionSubtitle>
      </div>

      {/* Image */}
      <div className="relative mt-12 w-full h-[500px] sm:h-[700px]">
        <Image
          src="/images/templates/v2/venue.png"
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