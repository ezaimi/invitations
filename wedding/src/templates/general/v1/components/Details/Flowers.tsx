"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

function Flowers() {
  const container = useRef<HTMLDivElement>(null)

  const f1 = useRef<HTMLImageElement>(null)
  const f2 = useRef<HTMLImageElement>(null)
  const f3 = useRef<HTMLImageElement>(null)
  const f4 = useRef<HTMLImageElement>(null)
  const f5 = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 85%",
        toggleActions: "play none none none"
      },
      defaults: { ease: "power2.out" } 
    })

    tl.fromTo(
      [f2.current, f5.current],
      {
        scale: 0.5,
        opacity: 0,
        y: 50,
        rotate: -10,
        filter: "blur(8px)"
      },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        rotate: 0,
        filter: "blur(0px)",
        duration: 1.4,
        stagger: 0.15
      }
    )


    tl.fromTo(
      [f1.current, f3.current, f4.current],
      {
        scale: 0.6,
        opacity: 0,
        y: 40,
        rotate: -8,
        filter: "blur(6px)"
      },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        rotate: 0,
        filter: "blur(0px)",
        duration: 1.0,       
        stagger: 0.15 
      },
      "-=1.3"
    )

  }, [])

  return (
    <div ref={container} className="min-w-full flex items-start relative h-60">

      <Image ref={f1} src="/images/templetes/v1/pink_lilies/1.png" alt="" width={150} height={100}
        className="object-contain absolute left-0 bottom-3 -ml-24 z-30" />

      <Image ref={f2} src="/images/templetes/v1/pink_lilies/3.png" alt="" width={260} height={260}
        className="object-contain absolute left-0 -ml-24 z-30" />

      <Image ref={f3} src="/images/templetes/v1/pink_lilies/4.png" alt="" width={260} height={260}
        className="object-contain absolute left-1/3 -translate-x-1/2 -mt-25 z-20" />

      <Image ref={f4} src="/images/templetes/v1/pink_lilies/5.png" alt="" width={280} height={260}
        className="object-contain absolute right-1 -mt-28" />

      <Image ref={f5} src="/images/templetes/v1/pink_lilies/6.png" alt="" width={260} height={260}
        className="object-contain absolute -right-36 -top-1 z-20" />
    </div>
  )
}

export default Flowers