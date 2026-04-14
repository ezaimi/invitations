"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

type Props = {
  text: string
  className?: string
  animate?: boolean
}

export default function DividerText({
  text,
  className,
  animate = false,
}: Props) {
  const containerRef = useRef<HTMLParagraphElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)
  const leftLineRef = useRef<HTMLSpanElement>(null)
  const rightLineRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!animate || !textRef.current) return

    const el = textRef.current
    const chars = text.split("")

    el.innerHTML = chars
    .map((c) =>
      c === " "
        ? `<span class="char inline-block opacity-0 translate-y-[10px]">&nbsp;</span>`
        : `<span class="char inline-block opacity-0 translate-y-[10px]">${c}</span>`
    )
    .join("")
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    })

    // left line
    tl.fromTo(
      leftLineRef.current,
      { scaleX: 0, transformOrigin: "left" },
      { scaleX: 1, duration: 0.4, ease: "power2.out" }
    )

      // text writing
      .to(
        el.querySelectorAll(".char"),
        {
          opacity: 1,
          y: 0,
          duration: 0.12,
          ease: "power1.out",
          stagger: 0.05,
        },
        "-=0.1"
      )

      // right line
      .fromTo(
        rightLineRef.current,
        { scaleX: 0, transformOrigin: "right" },
        { scaleX: 1, duration: 0.4, ease: "power2.out" },
        "-=0.2"
      )
  }, [animate, text])

  return (
    <p
      ref={containerRef}
      className={`text-center text-[1.30rem] ${className || ""}`}
      style={{ fontFamily: "var(--font-slight)" }}
    >
      <span
        ref={leftLineRef}
        className="inline-block w-6 h-px bg-[#676a26] align-middle mr-2 origin-left"
      ></span>

      {animate ? <span ref={textRef} /> : <span>{text}</span>}

      <span
        ref={rightLineRef}
        className="inline-block w-6 h-px bg-[#676a26] align-middle ml-2 origin-right"
      ></span>
    </p>
  )
}