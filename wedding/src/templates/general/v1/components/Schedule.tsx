"use client"

import type { V1ScheduleItem } from "@/templates/general/v1/types/Invitation"
import SharedSchedule from "@/templates/shared/components/Schedule"

export default function Schedule({ items }: { items: V1ScheduleItem[] }) {
  return (
    <SharedSchedule
      title="The Day Unfolds"
      titleClassName="text-[1.1rem] text-[#676a26] whitespace-nowrap"
      timeClassName="font-serenity text-[#bf777c] text-[1.5rem]"
      valueTitleClassName="text-[2rem] tracking-wider font-perandory-condensed text-[#4a4a4a]"
      descriptionClassName="font-belleza px-2 text-[#4a4a4a]"
      lineClassName="w-[2px] h-16 bg-[#676a26]"
      items={items}
    />
  )
}
