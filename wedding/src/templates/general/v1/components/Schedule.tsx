"use client"

import DividerText from "@/templates/shared/components/DividerText"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useEffect, useRef } from "react"
import type { V1ScheduleItem } from "@/templates/general/v1/types/Invitation"

gsap.registerPlugin(ScrollTrigger)

export default function Schedule({ items }: { items: V1ScheduleItem[] }) {
  const container = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const lineRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        )
      }

      itemRefs.current.forEach((item) => {
        if (!item) return

        const timeEl = item.querySelector(".schedule-time")
        const titleEl = item.querySelector(".schedule-title")
        const descriptionEl = item.querySelector(".schedule-desc")

        gsap.set([timeEl, titleEl, descriptionEl], { opacity: 0, y: 28 })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        })

        tl.to(timeEl, {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: "power3.out",
        })
          .to(
            titleEl,
            {
              opacity: 1,
              y: 0,
              duration: 0.65,
              ease: "power3.out",
            },
            "-=0.45"
          )
          .to(
            descriptionEl,
            {
              opacity: 1,
              y: 0,
              duration: 0.65,
              ease: "power3.out",
            },
            "-=0.42"
          )
      })

      lineRefs.current.forEach((line) => {
        if (!line) return

        gsap.fromTo(
          line,
          { opacity: 0, scaleY: 0, transformOrigin: "top center" },
          {
            opacity: 1,
            scaleY: 1,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: {
              trigger: line,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        )
      })
    }, container)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={container}
      className="w-full flex flex-col gap-12 items-center py-16 px-4"
    >
      <div ref={headingRef}>
        <DividerText
          className="text-[28px] text-[#676a26] whitespace-nowrap"
          text="Will  you join us?"
        />
      </div>

      <div className="relative flex flex-col items-center w-full max-w-md">
        {items.map((item, index) => (
          <div
            key={index}
            className="schedule-item flex flex-col items-center text-center"
          >
            <div
              ref={(el) => {
                itemRefs.current[index] = el
              }}
              className="flex flex-col items-center text-center"
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
            </div>

            {index !== items.length - 1 && (
              <div className="flex flex-col items-center my-8">
                <div
                  ref={(el) => {
                    lineRefs.current[index] = el
                  }}
                  className="schedule-line w-[2px] h-16 bg-[#676a26]"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
