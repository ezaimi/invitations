"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"

const Celebration = dynamic(() => import("./Celebration"))
const PlateDetails = dynamic(() => import("./PlateDetails"))
const Venue = dynamic(() => import("./Venue"))
const Schedule = dynamic(() => import("./Schedule"))
const Story = dynamic(() => import("./OurStory"))
const RSVP = dynamic(() => import("./RSVP"))
const EndSection = dynamic(() => import("./End"))

export default function DeferredSections() {
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null

    const showSections = () => {
      timeoutId = setTimeout(() => {
        setShouldRender(true)
      }, 250)
    }

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(showSections, { timeout: 700 })

      return () => {
        window.cancelIdleCallback(idleId)
        if (timeoutId) clearTimeout(timeoutId)
      }
    }

    showSections()

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [])

  if (!shouldRender) {
    return null
  }

  return (
    <>
      <Celebration />
      <PlateDetails />
      <Venue />
      <Schedule />
      <Story />
      <RSVP />
      <EndSection />
    </>
  )
}
