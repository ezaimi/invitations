"use client";

import SharedSchedule from "@/templates/shared/components/Schedule";

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
    <SharedSchedule
      animateTitle
      title="THE DAY UNFOLDS"
      titleMode="plain"
      titleClassName="text-[#000000] text-[40px] sm:text-[3.5rem] md:text-[4rem] leading-none font-serenity z-10 whitespace-nowrap"
      sectionClassName="w-full bg-[#f3f1e6] flex flex-col items-center pt-7 pb-20 text-center"
      titleWrapperClassName="w-full"
      itemsWrapperClassName="mt-12 flex flex-col items-center gap-5 px-6 max-w-[600px]"
      itemClassName="flex flex-col items-center"
      timeClassName="text-[#60683e] text-[24px] sm:text-[34px] font-serenity"
      valueTitleClassName="text-[27px] sm:text-[26px] font-perandory-condensed"
      descriptionClassName="mt-1 text-[14px] sm:text-[16px] text-gray-600 leading-[1.4] font-belleza mx-10"
      lineWrapperClassName="mt-5"
      lineClassName="h-8 w-[2px] bg-[#60683e]/40"
      items={program}
    />
  );
}
