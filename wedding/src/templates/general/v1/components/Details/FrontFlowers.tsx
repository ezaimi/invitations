"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function FrontFlowers() {
  const container = useRef<HTMLDivElement>(null)

  const f1 = useRef<HTMLImageElement>(null)
  const f2 = useRef<HTMLImageElement>(null)
  const f3 = useRef<HTMLImageElement>(null)

  useEffect(() => {
    gsap.fromTo(
      [f1.current, f2.current, f3.current],
      {
        scale: 0.6,
        opacity: 0,
        y: 30,
        rotate: 10,
        filter: "blur(6px)"
      },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        rotate: 0,
        filter: "blur(0px)",
        duration: 1.2,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 75%",
          toggleActions: "play none none none"
        }
      }
    )
  }, [])

  return (
    <div ref={container}>
      <Image ref={f1} src="/images/templates/v1/pink_lilies/2.png" alt="" width={120} height={100}
        className="object-contain absolute top-2 left-12 z-50" />

      <Image ref={f2} src="/images/templates/v1/pink_lilies/7.png" alt="" width={80} height={80}
        className="object-contain absolute right-7 top-9 z-50" />

      <Image ref={f3} src="/images/templates/v1/pink_lilies/8.png" alt="" width={75} height={60}
        className="object-contain absolute -right-9 top-28 z-50" />
    </div>
  )
}