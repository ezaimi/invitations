"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { MotionPathPlugin } from "gsap/MotionPathPlugin"

gsap.registerPlugin(MotionPathPlugin)

interface Props {
  buttonRef: React.RefObject<HTMLButtonElement | null>
  containerRef: React.RefObject<HTMLDivElement | null>
  trigger: boolean
  onComplete: () => void
}

function getBirdMetrics(bird: HTMLImageElement, container: HTMLDivElement) {
  const viewportWidth = window.innerWidth
  const birdWidth = bird.offsetWidth || (viewportWidth < 640 ? 160 : viewportWidth < 1024 ? 192 : 240)
  const birdHeight = bird.offsetHeight || birdWidth
  const rightOffset = birdWidth * 0.18
  const topOffset = birdHeight * 0.12

  return {
    birdWidth,
    birdHeight,
    startX: container.clientWidth + rightOffset - birdWidth / 2,
    startY: -topOffset + birdHeight / 2,
  }
}

export default function SquareMotion({ buttonRef, containerRef, trigger, onComplete }: Props) {
  const birdRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (trigger) return
    if (!birdRef.current || !containerRef.current) return

    const bird = birdRef.current
    const container = containerRef.current

    const positionBird = () => {
      const { startX, startY } = getBirdMetrics(bird, container)
      gsap.set(bird, {
        x: startX,
        y: startY,
        xPercent: -50,
        yPercent: -50,
        opacity: 1,
      })
    }

    positionBird()

    const resizeObserver = new ResizeObserver(positionBird)
    resizeObserver.observe(container)
    window.addEventListener("resize", positionBird)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener("resize", positionBird)
    }
  }, [trigger, containerRef])

  useEffect(() => {
    if (!trigger) return
    if (!birdRef.current || !buttonRef.current || !containerRef.current) return

    const bird    = birdRef.current
    const btnRect = buttonRef.current.getBoundingClientRect()
    const boxRect = containerRef.current.getBoundingClientRect()
    const { birdWidth, birdHeight, startX, startY } = getBirdMetrics(bird, containerRef.current)

    const targetX = btnRect.left - boxRect.left + btnRect.width / 2
    const targetY = btnRect.top - boxRect.top + btnRect.height / 2
    const curveX = startX - Math.max(boxRect.width * 0.18, birdWidth * 0.48)
    const curveY = startY + Math.max(boxRect.height * 0.18, birdHeight * 0.62)
    const nearTargetY = targetY - Math.max(72, birdHeight * 0.34)
    const exitX = startX - birdWidth * 0.08
    const exitY = startY - birdHeight * 0.04

    gsap.set(bird, { x: startX, y: startY, xPercent: -50, yPercent: -50, opacity: 1 })

    const tl = gsap.timeline({ delay: 0.5 })

    // curved landing
    tl.to(bird, {
      duration: 3,
      ease: "power1.inOut",
      motionPath: {
        path: [
          { x: startX,        y: startY         },
          { x: curveX,        y: curveY         },
          { x: targetX,       y: nearTargetY    },
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
          { x: exitX,         y: exitY          },
        ],
        curviness: 2,
      },
      onComplete,
    })

    return () => { tl.kill() }
  }, [trigger, buttonRef, containerRef, onComplete])

  return (
    <img
      ref={birdRef}
      src="/images/templates/v1/bird.gif"
      alt="bird"
      className="absolute left-0 top-0 w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56 xl:w-60 xl:h-60 object-contain pointer-events-none"
      style={{ zIndex: 30 }}
    />
  )
}
