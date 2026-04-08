"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function DateAnimation() {
  const containerRef = useRef<HTMLTimeElement>(null)
  const dustRefs = useRef<HTMLSpanElement[]>([])

  useEffect(() => {
    const spans = containerRef.current?.querySelectorAll("span")
    if (!spans) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    })

    tl.from(spans, {
      y: -60,
      opacity: 0,
      duration: 0.4,
      ease: "power3.in",
      stagger: 0.25
    })

    tl.to(spans, {
      y: 8,
      duration: 0.15,
      ease: "power1.out",
      stagger: 0.25,
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
      duration: 0.2,
      ease: "power2.out",
      stagger: 0.25
    }, "<+=0.05")

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

          {/* dust */}
          <span
            ref={(el) => { dustRefs.current[i] = el! }}
            className="absolute bottom-0 w-6 h-2 bg-[#999]/40 blur-sm rounded-full opacity-0"
          />
        </span>
      ))}
    </time>
  )
}
