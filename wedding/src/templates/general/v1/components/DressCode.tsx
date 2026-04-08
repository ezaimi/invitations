"use client"

import DividerText from "./DividerText"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function DressCode() {
  const containerRef = useRef<HTMLDivElement>(null)
  const circlesRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(circlesRef.current, {
        y: 40,
        opacity: 0,
      })

      circlesRef.current.forEach((el, i) => {
        gsap.to(el, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          delay: i * 0.1,
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      className="flex flex-col items-center text-center px-6 py-10"
    >
      <header className="flex items-center gap-4 mb-6 text-[#676a26]">
        <DividerText text="Dress Code" animate />
      </header>

      <p className="text-[#555] text-[1rem] font-belleza leading-relaxed max-w-md block max-[374px]:block min-[375px]:hidden">
        Guests are kindly requested to adhere
        to a formal dress code, opting for elegant attire
        suitable for an evening celebration.
      </p>

      <p className="text-[#555] text-[1rem] font-belleza leading-relaxed max-w-md hidden min-[375px]:block">
        <span className="block">Guests are kindly requested to adhere</span>
        <span className="block whitespace-nowrap">
          to a formal dress code, opting for elegant attire
        </span>
        <span>suitable for an evening celebration.</span>
      </p>

      <div className="flex gap-2 mt-4">
        {["#b7b37a", "#9fb6cf", "#cfa3a1", "#d9c38f", "#d9d69b"].map(
          (color, i) => (
            <div
              key={i}
              ref={(el) => {
                if (el) circlesRef.current[i] = el
              }}
              className="w-9.5 h-9.5 rounded-full"
              style={{ backgroundColor: color }}
            />
          )
        )}
      </div>
    </section>
  )
}