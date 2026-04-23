"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { MotionPathPlugin } from "gsap/MotionPathPlugin"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(MotionPathPlugin, ScrollTrigger)

function AnimatedMap({ mapImageSrc }: { mapImageSrc: string }) {
  const pinRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMapVisible, setIsMapVisible] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (!entry?.isIntersecting) return
        setIsMapVisible(true)
        observer.disconnect()
      },
      { threshold: 0.18 }
    )

    observer.observe(container)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!pinRef.current || !containerRef.current) return

    const el = pinRef.current
    const container = containerRef.current

    const ctx = gsap.context(() => {
      gsap.set(el, {
        x: -120,
        y: -120,
        scale: 0.7,
        opacity: 0,
      })

      const animateIn = () => {
        const tl = gsap.timeline()

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
        }, "-=1.2")
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
      }

      const top = container.getBoundingClientRect().top
      const triggerPoint = window.innerHeight * 0.9

      if (top <= triggerPoint) {
        animateIn()
        return
      }

      ScrollTrigger.create({
        trigger: container,
        start: "top 90%",
        once: true,
        onEnter: animateIn,
      })

      ScrollTrigger.refresh()
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="relative">
      <div
        ref={pinRef}
        className="absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 -mt-3 -ml-1"
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
        src={mapImageSrc}
        alt="map"
        width={530}
        height={100}
        className={`relative z-0 mt-4 w-full rounded-xl object-cover countdown-reveal ${
          isMapVisible ? "is-visible" : ""
        }`}
      />
    </div>
  )
}

export default AnimatedMap
