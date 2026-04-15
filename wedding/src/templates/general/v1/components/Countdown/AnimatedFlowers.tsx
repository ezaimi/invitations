"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

function AnimatedFlowers() {
  const container = useRef<HTMLDivElement>(null)
  const flower1 = useRef<HTMLDivElement>(null)
  const flower2 = useRef<HTMLDivElement>(null)
  const flower3 = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!container.current || !flower1.current || !flower2.current || !flower3.current) return

    const center = container.current.getBoundingClientRect()

    const getOffset = (el: HTMLDivElement) => {
      const rect = el.getBoundingClientRect()
      const rawX = center.left + center.width / 2 - (rect.left + rect.width / 2)
      const rawY = center.top + center.height / 2 - (rect.top + rect.height / 2)

      return {
        x: rawX * 0.65,
        y: rawY * 0.65,
      }
    }

    const offsets = [
      getOffset(flower1.current),
      getOffset(flower2.current),
      getOffset(flower3.current),
    ]

    gsap.fromTo(
      [flower1.current, flower2.current, flower3.current],
      {
        opacity: 0,
        scale: 0.25,
        x: (i) => offsets[i].x,
        y: (i) => offsets[i].y,
      },
      {
        opacity: 1,
        scale: 1,
        x: 0,
        y: 0,
        duration: 2.2,
        ease: "power4.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    )
  }, [])

  return (
    <div ref={container}>
      <div ref={flower1} className="absolute left-1/2 -translate-x-1/2 z-30 -mt-10">
        <Image
          src="/images/templates/v1/pink_lilies/6.png"
          alt="Example image"
          width={220}
          height={200}
          className="object-cover rounded-lg -rotate-60 -mt-20"
          priority
        />
      </div>

      <div ref={flower2} className="absolute right-1/3 mr-6 -mt-4 z-20">
        <Image
          src="/images/templates/v1/pink_lilies/9.png"
          alt="Example image"
          width={270}
          height={250}
          className="object-cover rounded-lg"
          priority
        />
      </div>

      <div ref={flower3} className="absolute left-1/2 -ml-4 z-10 -mt-5">
        <Image
          src="/images/templates/v1/pink_lilies/4.png"
          alt="Example image"
          width={260}
          height={200}
          className="object-cover rounded-lg rotate-30"
          priority
        />
      </div>
    </div>
  )
}

export default AnimatedFlowers