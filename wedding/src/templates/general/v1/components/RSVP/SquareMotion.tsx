"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { MotionPathPlugin } from "gsap/MotionPathPlugin"

gsap.registerPlugin(MotionPathPlugin)

interface Props {
  buttonRef: React.RefObject<HTMLButtonElement | null>
  trigger: boolean
  onComplete: () => void
}

export default function SquareMotion({ buttonRef, trigger, onComplete }: Props) {
  const birdRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (!trigger) return
    if (!birdRef.current || !buttonRef.current) return

    const bird    = birdRef.current
    const btnRect = buttonRef.current.getBoundingClientRect()

    const centerX = window.innerWidth / 2
    const targetX = btnRect.left + btnRect.width  / 2
    const targetY = btnRect.top  + btnRect.height / 2

    gsap.set(bird, { x: centerX, y: -150, xPercent: -50, yPercent: -50, opacity: 1 })

    const tl = gsap.timeline({ delay: 0.5 })

    // curved landing
    tl.to(bird, {
      duration: 3,
      ease: "power1.inOut",
      motionPath: {
        path: [
          { x: centerX,       y: -150          },
          { x: centerX + 100, y: targetY - 250  },
          { x: targetX,       y: targetY - 80   },
          { x: targetX,       y: targetY        },
        ],
        curviness: 2,
      },
    })

    // final settle
    tl.to(bird, { y: targetY, duration: 0.8, ease: "power1.out" })

    // stay
    tl.to({}, { duration: 1.2 })

    // takeoff
    tl.to(bird, {
      duration: 3,
      ease: "power1.inOut",
      motionPath: {
        path: [
          { x: targetX,       y: targetY        },
          { x: targetX - 140, y: targetY - 260   },
          { x: centerX + 60,  y: -200            },
        ],
        curviness: 2,
      },
      onComplete,
    })

    return () => { tl.kill() }
  }, [trigger])

  return (
    <img
      ref={birdRef}
      src="/images/templates/v1/bird.gif"
      alt="bird"
      className="fixed left-0 top-0 w-60 h-60 z-9999 opacity-0 object-contain pointer-events-none"
    />
  )
}
