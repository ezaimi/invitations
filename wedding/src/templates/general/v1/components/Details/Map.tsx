"use client"

import { useEffect, useRef, useState } from "react"
import DividerText from "../../../../shared/components/DividerText"

import { MapPin, Send } from "lucide-react"
import gsap from "gsap"
import AnimatedMap from "./AnimatedMap"
import type { V1DetailsData } from "@/templates/general/v1/types/Invitation"

function Map({ data }: { data: Pick<V1DetailsData, "mapImageSrc"> }) {
  const iconRef = useRef<SVGSVGElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const [isCardVisible, setIsCardVisible] = useState(false)

  useEffect(() => {
    if (!iconRef.current || !textRef.current) return

    const tl = gsap.timeline({
      repeat: -1,
      repeatDelay: 2,
    })

    // icon shake
    tl.to(iconRef.current, { rotation: 18, duration: 0.1 })
      .to(iconRef.current, { rotation: -18, duration: 0.1 })
      .to(iconRef.current, { rotation: 10, duration: 0.1 })
      .to(iconRef.current, { rotation: -10, duration: 0.1 })
      .to(iconRef.current, { rotation: 0, duration: 0.1 })

      // text shake (slight horizontal movement)
      .to(textRef.current, { x: 3, duration: 0.08 }, "-=0.4")
      .to(textRef.current, { x: -3, duration: 0.08 })
      .to(textRef.current, { x: 2, duration: 0.08 })
      .to(textRef.current, { x: -2, duration: 0.08 })
      .to(textRef.current, { x: 0, duration: 0.08 })
  }, [])

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (!entry?.isIntersecting) return
        setIsCardVisible(true)
        observer.disconnect()
      },
      { threshold: 0.35 }
    )

    observer.observe(card)

    return () => observer.disconnect()
  }, [])

  return (
    <div className="flex w-full flex-col items-center px-8">
      <header className="flex items-center gap-4 text-[#676a26]">
        <DividerText text="Find us here" animate triggerStart="top bottom" />
      </header>

      <AnimatedMap mapImageSrc={data.mapImageSrc} />

      <div
        ref={cardRef}
        className={`mt-4 flex w-full items-center justify-between rounded-2xl  px-4 py-2 countdown-reveal ${
          isCardVisible ? "is-visible" : ""
        }`}
      >
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#d9e2d3] -ml-2">
            <MapPin className="w-4 h-4 text-[#6f7f5c]" />
          </div>

          <div className="w-0 min-w-[92px] max-w-[140px] -ml-1 flex-1 font-belleza">
            <h3 className="block w-full truncate text-[#131313] text-[0.8rem] font-medium">
              Rose Garden Estate
            </h3>
            <p className="block w-full truncate text-[#8a8a8a] text-[0.5rem]">
              16621 Lathrop Dr, Yorba Linda djhsdj kjsddhsdh
            </p>
          </div>
        </div>

        <button className="ml-2 flex shrink-0 items-center gap-1.5 rounded-full bg-[#6f7f5c] px-2.5 py-2 text-[0.56rem] tracking-[1px] text-[#f0ecec] transition hover:opacity-90 sm:ml-3 sm:gap-2 sm:px-3 sm:text-[0.6rem] sm:tracking-[2.5px]">
          <Send ref={iconRef} className="w-4 h-4" />
          <span ref={textRef}>DIRECTIONS</span>
        </button>
      </div>
    </div>
  )
}

export default Map
