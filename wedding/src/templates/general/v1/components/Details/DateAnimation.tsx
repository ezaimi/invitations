"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import type { V1InvitationDate } from "@/templates/general/v1/types/Invitation"

gsap.registerPlugin(ScrollTrigger)

export default function DateAnimation({ date }: { date: V1InvitationDate }) {
  const containerRef = useRef<HTMLTimeElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const spans = containerRef.current?.querySelectorAll("span")
      if (!spans) return

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
          once: true
        },
        defaults: { ease: "power3.out" }
      })

      tl.from(spans, {
        y: -50,
        opacity: 0,
        duration: 1.2,
        stagger: 0.35
      })

    }, containerRef)

    ScrollTrigger.refresh()

    return () => ctx.revert()
  }, [])

  return (
    <time
      ref={containerRef}
      dateTime={date.iso}
      className="flex flex-col items-center font-serenity -mt-10 text-[#676a26] text-[6rem] leading-[1.3] relative"
    >
      {date.parts.map((val, i) => (
        <span key={i} className="relative flex justify-center">
          {val}
        </span>
      ))}
    </time>
  )
}
