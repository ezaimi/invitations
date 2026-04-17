"use client"

import { useEffect, useRef, useState } from "react"
import AnimatedFlowers from "./AnimatedFlowers"

const TARGET_DATE = new Date("2026-07-22T00:00:00")

function Countdown() {
  const [time, setTime] = useState("00:00:00:00")
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (!entry?.isIntersecting) return
        setIsVisible(true)
        observer.disconnect()
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    )

    observer.observe(section)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const update = () => {
      const now = new Date()

      let months =
        (TARGET_DATE.getFullYear() - now.getFullYear()) * 12 +
        (TARGET_DATE.getMonth() - now.getMonth())

      let tempDate = new Date(now)
      tempDate.setMonth(tempDate.getMonth() + months)

      if (tempDate > TARGET_DATE) {
        months--
        tempDate = new Date(now)
        tempDate.setMonth(tempDate.getMonth() + months)
      }

      const diff = TARGET_DATE.getTime() - tempDate.getTime()

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

    update() // 🔥 THIS FIXES IT (runs immediately)
    const interval = setInterval(update, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div ref={sectionRef} className='h-130 flex items-end justify-center'>
      <div className='h-97 rounded-t-[95%] w-full bg-[#c3c2a0] pb-3 relative max-w-[500px]'>
        <div className="-mt-3 ">
          <AnimatedFlowers />
        </div>
        <div className='flex flex-col h-full justify-end items-center '>
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
  )
}

export default Countdown
