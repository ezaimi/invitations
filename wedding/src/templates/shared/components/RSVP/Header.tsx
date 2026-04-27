"use client"

import { useEffect, useRef } from "react"
import type { ReactNode } from "react"

import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

type SectionTitleProps = {
  children: ReactNode
  className?: string
  animate?: boolean
}

export default function SectionTitle({
  children,
  className = "",
  animate = false,
}: SectionTitleProps) {
  const containerRef = useRef<HTMLHeadingElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!animate || typeof children !== "string" || !textRef.current) return

    const el = textRef.current
    el.innerHTML = children
      .split("")
      .map((char) =>
        char === " "
          ? `<span class="char inline-block opacity-0 translate-y-[10px]">&nbsp;</span>`
          : `<span class="char inline-block opacity-0 translate-y-[10px]">${char}</span>`
      )
      .join("")

    const ctx = gsap.context(() => {
      gsap.to(el.querySelectorAll(".char"), {
        opacity: 1,
        y: 0,
        duration: 0.22,
        ease: "power1.out",
        stagger: 0.065,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [animate, children])

  return (
    <h1
      ref={containerRef}
      className={`text-[#000000] text-[40px] sm:text-[3.5rem] md:text-[4rem] leading-none font-serenity z-10 ${className}`}
    >
      {animate && typeof children === "string" ? <span ref={textRef} /> : children}
    </h1>
  )
}
