"use client"

import DividerText from "@/templates/shared/components/DividerText"
import { useEffect, useRef, useState } from "react"

export default function Schedule() {
  const container = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

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
    const section = container.current
    if (!section) return

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (!entry?.isIntersecting) return
        setIsVisible(true)
        observer.disconnect()
      },
      { threshold: 0.08, rootMargin: "0px 0px -2% 0px" }
    )

    observer.observe(section)

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={container}
      className="w-full flex flex-col gap-12 items-center py-16 px-4 bg-[#f5f4ec]"
    >
      <div className={`schedule-reveal-item reveal-1 ${isVisible ? "is-visible" : ""}`}>
        <DividerText
          className="text-[28px] whitespace-nowrap"
          text="Will  you join us?"
        />
      </div>

      <div className="relative flex flex-col items-center w-full max-w-md">
        {program.map((item, index) => (
          <div
            key={index}
            className="schedule-item flex flex-col items-center text-center"
          >
            <div
              className={`schedule-reveal-item ${
                index === 0
                  ? "reveal-2"
                  : index === 1
                    ? "reveal-3"
                    : index === 2
                      ? "reveal-4"
                      : "reveal-5"
              } ${isVisible ? "is-visible" : ""}`}
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

            {index !== program.length - 1 && (
              <div className="flex flex-col items-center my-8">
                <div
                  className={`schedule-line schedule-line-reveal w-[2px] h-16 bg-[#676a26] ${isVisible ? "is-visible" : ""}`}
                  style={{ animationDelay: `${0.28 + index * 0.18}s` }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
