"use client"

import { useEffect, useRef, useState } from "react"
import type { V1InvitationDate } from "@/templates/general/v1/types/Invitation"

export default function DateAnimation({ date }: { date: V1InvitationDate }) {
  const containerRef = useRef<HTMLTimeElement>(null)
  const partsRef = useRef<Array<HTMLSpanElement | null>>([])
  const [visibleParts, setVisibleParts] = useState<boolean[]>(
    () => date.parts.map(() => false)
  )

  useEffect(() => {
    const elements = partsRef.current.filter(
      (part): part is HTMLSpanElement => Boolean(part)
    )
    if (!elements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return

          const index = Number(
            (entry.target as HTMLSpanElement).dataset.partIndex ?? -1
          )
          if (index < 0) return

          setVisibleParts((current) => {
            if (current[index]) return current
            const next = [...current]
            next[index] = true
            return next
          })

          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.65 }
    )

    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [date.parts])

  return (
    <time
      ref={containerRef}
      dateTime={date.iso}
      className="flex flex-col items-center font-serenity -mt-10 text-[#676a26] text-[6rem] leading-[1.3] relative"
    >
      {date.parts.map((val, i) => (
        <span
          key={i}
          ref={(element) => {
            partsRef.current[i] = element
          }}
          data-part-index={i}
          className={`relative flex justify-center transition-all duration-[1200ms] ease-out ${
            visibleParts[i]
              ? "translate-y-0 opacity-100"
              : "-translate-y-12 opacity-0"
          }`}
        >
          {val}
        </span>
      ))}
    </time>
  )
}
