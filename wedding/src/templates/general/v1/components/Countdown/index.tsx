"use client"

import { useEffect, useRef, useState } from "react"
import AnimatedFlowers from "./AnimatedFlowers"
import type { V1CountdownData } from "@/templates/general/v1/types/Invitation"

function Countdown({ data }: { data: V1CountdownData }) {
  const [time, setTime] = useState("00:00:00:00")
  const [isVisible, setIsVisible] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const content = contentRef.current
    if (!content) return

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        setIsVisible(Boolean(entry?.isIntersecting))
      },
      { threshold: 0.45 }
    )

    observer.observe(content)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const targetDate = new Date(data.targetDateTime)

    const update = () => {
      const now = new Date()

      let months =
        (targetDate.getFullYear() - now.getFullYear()) * 12 +
        (targetDate.getMonth() - now.getMonth())

      let tempDate = new Date(now)
      tempDate.setMonth(tempDate.getMonth() + months)

      if (tempDate > targetDate) {
        months--
        tempDate = new Date(now)
        tempDate.setMonth(tempDate.getMonth() + months)
      }

      const diff = targetDate.getTime() - tempDate.getTime()

      if (diff <= 0) {
        setTime("00:00:00:00")
        return
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
      const seconds = Math.floor((diff / 1000) % 60)

      const format = (n: number) => n.toString().padStart(2, "0")

      setTime(
        `${format(months)}:${format(days)}:${format(hours)}:${format(seconds)}`
      )
    }

    update()
    const interval = setInterval(update, 1000)

    return () => clearInterval(interval)
  }, [data.targetDateTime])

  return (
    <div className='relative h-125 overflow-hidden flex items-end justify-center'>
      <div className='absolute inset-x-0 top-33 z-20 flex justify-center pointer-events-none'>
        <div className='relative w-full max-w-[500px]'>
          <AnimatedFlowers />
        </div>
      </div>
      <div className='relative z-10 h-97 rounded-t-[95%] w-full bg-[#c3c2a0] pb-3 max-w-[500px]'>
        <div className='flex flex-col h-full justify-end items-center'>
          <div ref={contentRef} className='flex flex-col items-center'>
            <div
              className={`text-[#676a26] font-serenity text-[2.2rem] countdown-reveal ${
                isVisible ? "is-visible" : ""
              }`}
              style={{ animationDelay: "0.18s" }}
            >
              Countdown
            </div>
            <div
              className={`text-[#676a26] font-serenity text-[4rem] tracking-wider countdown-reveal ${
                isVisible ? "is-visible" : ""
              }`}
              style={{ animationDelay: "0.3s" }}
            >
              {time}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Countdown
