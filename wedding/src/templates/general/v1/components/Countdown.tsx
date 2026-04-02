"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

function getTimeLeft(targetDate: Date) {
  const total = targetDate.getTime() - new Date().getTime()

  const seconds = Math.floor((total / 1000) % 60)
  const minutes = Math.floor((total / 1000 / 60) % 60)
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24)
  const days = Math.floor(total / (1000 * 60 * 60 * 24))

  return { total, days, hours, minutes, seconds }
}

export default function Countdown() {
  const targetDate = new Date("2026-07-22T00:00:00") 

  const [timeLeft, setTimeLeft] = useState(getTimeLeft(targetDate))

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const format = (num: number) => String(num).padStart(2, "0")

  return (
    <div className="bg-amber-300 w-full flex flex-col items-center justify-center text-center pt-15">

      <div className="w-full bg-[#a3a57a] rounded-t-[300px] pt-1 pb-1  flex flex-col items-center">

      {/* Flowers */}
      <div className="relative w-[260px] h-[200px] mb-2">
        <Image
          src="/images/templates/v1/pink_lilies.svg" 
          alt="flowers"
          fill
          className="object-contain"
        />
      </div>

      {/* Title */}
      <h2
        className="tracking-[0.1em] mb-1.5"
        style={{
          fontFamily: "Simple Serenity",
          color: "#6b6f2a",
          fontSize: "2rem",
        }}
      >
        COUNTDOWN
      </h2>

      {/* Timer */}
      <div
              className="mb-4"

        style={{
          fontFamily: "Simple Serenity",
          color: "#6b6f2a",
          fontSize: "3rem",
          letterSpacing: "0.1em",
        }}
      >
        {format(timeLeft.days)}:{format(timeLeft.hours)}:
        {format(timeLeft.minutes)}:{format(timeLeft.seconds)}
      </div>
    </div>
    </div>
  )
}