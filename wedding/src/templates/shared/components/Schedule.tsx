"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import type { ReactNode } from "react"

import DividerText from "@/templates/shared/components/DividerText"

gsap.registerPlugin(ScrollTrigger)

export type SharedScheduleItem = {
  description: ReactNode
  time: ReactNode
  title: ReactNode
}

export interface SharedScheduleProps {
  animateTitle?: boolean
  descriptionClassName?: string
  itemClassName?: string
  items: SharedScheduleItem[]
  itemsWrapperClassName?: string
  lineClassName?: string
  lineWrapperClassName?: string
  sectionClassName?: string
  timeClassName?: string
  title: ReactNode
  titleClassName?: string
  titleTriggerStart?: string
  titleMode?: "divider" | "plain"
  titleWrapperClassName?: string
  valueTitleClassName?: string
}

export default function SharedSchedule({
  animateTitle = true,
  descriptionClassName = "font-belleza px-2 text-[#4a4a4a]",
  itemClassName = "flex flex-col items-center text-center",
  items,
  itemsWrapperClassName = "relative flex w-full max-w-md flex-col items-center",
  lineClassName = "schedule-line w-[2px] h-16 bg-[#676a26]",
  lineWrapperClassName = "flex flex-col items-center my-8",
  sectionClassName = "w-full flex flex-col gap-12 items-center py-16 px-4",
  timeClassName = "font-serenity text-[#bf777c] text-[1.5rem]",
  title,
  titleClassName = "text-[#676a26] whitespace-nowrap",
  titleTriggerStart = "top 85%",
  titleMode = "divider",
  titleWrapperClassName,
  valueTitleClassName = "text-[2rem] tracking-wider font-perandory-condensed text-[#4a4a4a]",
}: SharedScheduleProps) {
  const containerRef = useRef<HTMLElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const lineRefs = useRef<(HTMLDivElement | null)[]>([])
  const plainTitleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (animateTitle && titleMode === "plain" && plainTitleRef.current) {
        const chars = plainTitleRef.current.querySelectorAll(".schedule-title-char")

        gsap.set(chars, {
          opacity: 0,
          y: 10,
        })

        gsap.to(chars, {
          opacity: 1,
          y: 0,
          duration: 0.12,
          ease: "power1.out",
          stagger: 0.05,
          scrollTrigger: {
            trigger: plainTitleRef.current,
            start: titleTriggerStart,
            toggleActions: "play none none none",
          },
        })
      }

      itemRefs.current.forEach((item) => {
        if (!item) return

        const timeEl = item.querySelector("[data-schedule-time]")
        const titleEl = item.querySelector("[data-schedule-title]")
        const descriptionEl = item.querySelector("[data-schedule-description]")

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
    }, containerRef)

    return () => ctx.revert()
  }, [animateTitle, titleMode, titleTriggerStart])

  const renderedTitle =
    typeof title === "string" && titleMode === "divider" ? (
      <DividerText
        animate={animateTitle}
        className={titleClassName}
        text={title}
        triggerStart={titleTriggerStart}
      />
    ) : typeof title === "string" ? (
      <h2 ref={plainTitleRef} className={titleClassName}>
        {title.split("").map((char, index) => (
          <span
            key={`${char}-${index}`}
            className={`inline-block ${animateTitle ? "schedule-title-char" : ""}`}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </h2>
    ) : (
      <div className={titleClassName}>{title}</div>
    )

  return (
    <section ref={containerRef} className={sectionClassName}>
      <div className={titleWrapperClassName}>{renderedTitle}</div>

      <div className={itemsWrapperClassName}>
        {items.map((item, index) => (
          <div key={index} className="schedule-item flex flex-col items-center text-center">
            <div
              ref={(el) => {
                itemRefs.current[index] = el
              }}
              className={itemClassName}
            >
              <span data-schedule-time className={timeClassName}>
                {item.time}
              </span>

              <h3 data-schedule-title className={valueTitleClassName}>
                {item.title}
              </h3>

              <p data-schedule-description className={descriptionClassName}>
                {item.description}
              </p>
            </div>

            {index !== items.length - 1 && (
              <div className={lineWrapperClassName}>
                <div
                  ref={(el) => {
                    lineRefs.current[index] = el
                  }}
                  className={lineClassName}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
