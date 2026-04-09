"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function DateAnimation() {
  const containerRef = useRef<HTMLTimeElement>(null)
  const dustRefs = useRef<HTMLSpanElement[]>([])

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
        defaults: { ease: "power2.out" }
      })

      tl.from(spans, {
        y: -70,
        opacity: 0,
        duration: 0.6,
        stagger: 0.2
      })

      tl.to(spans, {
        y: 12,
        duration: 0.2,
        ease: "power1.in",
        stagger: 0.2,
        onStart: () => {
          dustRefs.current.forEach((dust) => {
            if (!dust) return
            gsap.fromTo(
              dust,
              { scale: 0.5, opacity: 0.6, y: 0 },
              {
                scale: 1.8,
                opacity: 0,
                y: -10,
                duration: 0.5,
                ease: "power2.out"
              }
            )
          })
        }
      }, "<")

      tl.to(spans, {
        y: 0,
        duration: 0.25,
        ease: "power2.out",
        stagger: 0.2
      }, "<+=0.05")

    }, containerRef)

    ScrollTrigger.refresh()

    return () => ctx.revert()
  }, [])

  return (
    <time
      ref={containerRef}
      dateTime="2026-07-22"
      className="flex flex-col items-center font-serenity -mt-10 text-[#676a26] text-[6rem] leading-[1.3] relative"
    >
      {["22", "07", "26"].map((val, i) => (
        <span key={i} className="relative flex justify-center">
          {val}
          <span
            ref={(el) => { if (el) dustRefs.current[i] = el }}
            className="absolute bottom-0 w-6 h-2 bg-[#999]/40 blur-sm rounded-full opacity-0"
          />
        </span>
      ))}
    </time>
  )
}