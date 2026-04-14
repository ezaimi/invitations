"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function RingsAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const leftRef = useRef<HTMLImageElement>(null)
  const rightRef = useRef<HTMLImageElement>(null)
  const mergedRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      // TRUE initial state (hidden, no flash)
      gsap.set([leftRef.current, rightRef.current, mergedRef.current], {
        opacity: 0
      })
      gsap.set(leftRef.current, { x: -140 })
      gsap.set(rightRef.current, { x: 140 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
          once: true
        },
        defaults: { ease: "power4.out" }
      })

      // appear first (no jump)
      tl.to([leftRef.current, rightRef.current], {
        opacity: 1,
        duration: 0.3
      })

      // then move
      tl.to([leftRef.current, rightRef.current], {
        x: 0,
        duration: 3
      })

      // early merge transition
      tl.to(mergedRef.current, {
        opacity: 1,
        duration: 0.2
      }, "-=1.8")

      tl.to([leftRef.current, rightRef.current], {
        opacity: 0,
        duration: 0.7
      }, "<")

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="relative w-[120px] h-[100px]">
      <Image
        ref={mergedRef}
        src="/images/templates/v1/rings.svg"
        alt=""
        fill
        className="opacity-0"
      />
      <Image
        ref={leftRef}
        src="/images/templates/v1/leftring.png"
        alt=""
        fill
        className="opacity-0"
      />
      <Image
        ref={rightRef}
        src="/images/templates/v1/rightring.png"
        alt=""
        fill
        className="opacity-0"
      />
    </div>
  )
}