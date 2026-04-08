"use client"

import { useEffect, useRef } from "react"
import DividerText from "./DividerText"

import { MapPin, Send } from "lucide-react"
import gsap from "gsap"
import AnimatedMap from "./AnimatedMap"

function Map() {
  const iconRef = useRef<SVGSVGElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)

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

  return (
    <div className="flex flex-col items-center px-8">
      <DividerText text="Find us here" />

      <AnimatedMap />

      <div className="flex items-center justify-between bg-[#f9faf9]/95 rounded-2xl px-4 py-2 mt-4 w-full mx-1">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#d9e2d3] -ml-2 flex items-center justify-center">
            <MapPin className="w-4 h-4 text-[#6f7f5c]" />
          </div>

          <div className="min-w-0 max-w-[140px] font-belleza">
            <h3 className="text-[#131313] text-[0.8rem] font-medium truncate">
              Rose Garden Estate
            </h3>
            <p className="text-[#8a8a8a] text-[0.5rem] truncate">
              16621 Lathrop Dr, Yorba Linda djhsdj kjsddhsdh
            </p>
          </div>
        </div>

        <button className="flex items-center -mr-2 gap-2 bg-[#6f7f5c] tracking-[2.5px] text-[#f0ecec] text-[0.6rem] px-3 py-2 rounded-full hover:opacity-90 transition">
          <Send ref={iconRef} className="w-4 h-4" />
          <span ref={textRef}>DIRECTIONS</span>
        </button>
      </div>
    </div>
  )
}

export default Map