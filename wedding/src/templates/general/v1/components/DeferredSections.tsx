"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import type {
  V1CountdownData,
  V1DetailsData,
  V1RSVPData,
  V1ScheduleItem,
} from "../types/Invitation"

const Details = dynamic(() => import("./Details/Details"))
const Schedule = dynamic(() => import("./Schedule"))
const RSVP = dynamic(() => import("./RSVP"))
const Countdown = dynamic(() => import("./Countdown"))

type DeferredSectionsProps = {
  countdown: V1CountdownData
  details: V1DetailsData
  rsvp: V1RSVPData
  scheduleItems: V1ScheduleItem[]
}

export default function DeferredSections({
  countdown,
  details,
  rsvp,
  scheduleItems,
}: DeferredSectionsProps) {
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
      <Details data={details} />
      <Schedule items={scheduleItems} />
      <RSVP data={rsvp} />
      <br />
      <br />
      <Countdown data={countdown} />
    </>
  )
}
