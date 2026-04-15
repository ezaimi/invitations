"use client"

import { useEffect, useState } from "react"
import AnimatedFlowers from "./AnimatedFlowers"

function Countdown() {
  const [time, setTime] = useState("00:00:00:00")

  const targetDate = new Date("2026-07-22T00:00:00")

  useEffect(() => {
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
      const minutes = Math.floor((diff / (1000 * 60)) % 60)
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
    <div className='h-140 flex items-end justify-center'>
      <div className='h-110 rounded-t-[90%] w-full bg-[#c3c2a0] pb-3 relative max-w-[500px]'>
        <div className="-mt-3 ">
          <AnimatedFlowers />
        </div>
        <div className='flex flex-col h-full justify-end items-center '>
          <div className='text-[#676a26] font-serenity text-[2.2rem]'>Countdown</div>
          <div className='text-[#676a26] font-serenity text-[4rem] tracking-wider'>
            {time}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Countdown