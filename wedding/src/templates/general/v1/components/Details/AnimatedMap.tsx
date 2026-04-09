"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { MotionPathPlugin } from "gsap/MotionPathPlugin"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(MotionPathPlugin, ScrollTrigger)

function AnimatedMap() {
  const pinRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!pinRef.current || !containerRef.current) return

    const el = pinRef.current

    gsap.set(el, {
      x: -120,
      y: -120,
      scale: 0.7,
      opacity: 0,
    })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    })

    tl.to(el, {
      motionPath: {
        path: [
          { x: -120, y: -120 },
          { x: 100, y: -80 },
          { x: -90, y: 90 },
          { x: 70, y: 40 },
          { x: -40, y: -30 },
          { x: 20, y: 10 },
          { x: 0, y: 0 },
        ],
        curviness: 2,
      },
      opacity: 1,
      scale: 1,
      duration: 2.6,
      ease: "sine.out",
    })
      .to(el, {
        y: 6,
        duration: 0.15,
        ease: "power1.inOut",
      })
      .to(el, {
        y: 0,
        duration: 0.15,
        ease: "power1.inOut",
      })
  }, [])

  return (
    <div ref={containerRef} className="relative">
      <div
        ref={pinRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -mt-3 -ml-1"
      >
        <Image
          src="/icons/templetes/v1/pin.png"
          alt="map"
          width={30}
          height={30}
          className="w-full object-cover"
        />
      </div>

      <Image
        src="/images/templetes/v1/map.png"
        alt="map"
        width={530}
        height={100}
        className="w-full object-cover rounded-xl mt-4"
      />
    </div>
  )
}

export default AnimatedMap