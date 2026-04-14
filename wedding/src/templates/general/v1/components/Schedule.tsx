"use client"

import DividerText from "@/templates/shared/components/DividerText"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function Schedule() {
  const container = useRef<HTMLDivElement>(null)

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
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = container.current?.querySelectorAll(".schedule-item")
      if (!items) return
  
      const master = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      })
  
      items.forEach((item, i) => {
        const time  = item.querySelector(".schedule-time")
        const title = item.querySelector(".schedule-title")
        const desc  = item.querySelector(".schedule-desc")
        const line  = item.querySelector(".schedule-line")
  
        gsap.set([time, title, desc], {
          autoAlpha: 0,
          y: 14,
        })
  
        if (line) {
          gsap.set(line, {
            scaleY: 0,
            autoAlpha: 0,
            transformOrigin: "top center",
          })
        }
  
        const tl = gsap.timeline()
  
        tl.to(time, {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          ease: "power3.out",
        })
          .to(title, {
            autoAlpha: 1,
            y: 0,
            duration: 0.85,
            ease: "power3.out",
          }, "-=0.6")
          .to(desc, {
            autoAlpha: 1,
            y: 0,
            duration: 0.95,
            ease: "power3.out",
          }, "-=0.55")
  
        if (line) {
          tl.to(line, {
            scaleY: 1,
            autoAlpha: 1,
            duration: 0.7,
            ease: "power2.inOut",
          }, "-=0.4")
        }
  
        master.add(tl, i === 0 ? "+=0.1" : "-=0.35")
      })
    }, container)
  
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={container}
      className="w-full flex flex-col gap-12 items-center py-16 px-4 bg-[#f5f4ec]"
    >
      <DividerText
        className="text-[28px] whitespace-nowrap"
        text="Will  you join us?"
        animate
      />

      <div className="relative flex flex-col items-center w-full max-w-md">
        {program.map((item, index) => (
          <div
            key={index}
            className="schedule-item flex flex-col items-center text-center"
          >
            <span className="schedule-time font-serenity text-[#bf777c] text-[1.5rem]">
              {item.time}
            </span>

            <h3 className="schedule-title text-[2rem] tracking-wider font-perandory-condensed text-[#4a4a4a]">
              {item.title}
            </h3>

            <p className="schedule-desc font-belleza px-2 text-[#4a4a4a]">
              {item.description}
            </p>

            {index !== program.length - 1 && (
              <div className="flex flex-col items-center my-8">
                <div className="schedule-line w-[2px] h-12 bg-[#676a26]" />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}