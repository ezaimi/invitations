"use client";

import SectionTitle from "./Header";

const program = [
  {
    time: "17:30",
    title: "GUEST ARRIVAL",
    description:
      "Please arrive, find your seats, and settle in as we prepare to begin the ceremony.",
  },
  {
    time: "18:00",
    title: "CEREMONY",
    description:
      "Join us as we exchange our vows and celebrate the start of our life together.",
  },
  {
    time: "19:00",
    title: "COCKTAIL HOUR",
    description:
      "Enjoy a selection of drinks and light bites while mingling with family and friends.",
  },
  {
    time: "20:00",
    title: "PARTY & DINNER",
    description:
      "Celebrate with us on the dance floor as we enjoy music, laughter, and the evening together.",
  },
];

export default function Schedule() {
  return (
    <section className="w-full bg-[#f3f1e6] flex flex-col items-center pt-7 pb-20 text-center">

      <SectionTitle>
        THE DAY UNFOLDS
      </SectionTitle>

      <div className="mt-12 flex flex-col items-center gap-5 px-6 max-w-[600px]">

        {program.map((item, index) => (
          <div key={index} className="flex flex-col items-center">

            {/* Time */}
            <div className="text-[#60683e] text-[24px] sm:text-[34px] font-serenity">
              {item.time}
            </div>

            {/* Title */}
            <div className=" text-[27px] sm:text-[26px] font-perandory-condensed">
              {item.title}
            </div>

            {/* Description */}
            <p className="mt-1 text-[14px] sm:text-[16px] text-gray-600 leading-[1.4] font-belleza mx-10">
              {item.description}
            </p>

            {/* Divider (except last) */}
            {index !== program.length - 1 && (
              <div className="mt-5 h-8 w-[2px] bg-[#60683e]/40" />
            )}

          </div>
        ))}

      </div>

    </section>
  );
}
