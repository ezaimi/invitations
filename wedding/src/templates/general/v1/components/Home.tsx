"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import type { Invitation } from "@/templates/general/v1/types/Invitation"



function Home({ data }: { data: Invitation }) {

    const keyholeRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      const tl = gsap.timeline()
  
      tl.fromTo(
        keyholeRef.current,
        { scale: 1 },
        {
          scale: 6,
          duration: 5,
          ease: "power2.inOut"
        }
      )
    }, [])

    return (
        <div className=''> <div className="relative min-h-screen overflow-hidden">

            <div
                ref={keyholeRef}
                className="absolute inset-0 bg-center bg-no-repeat bg-cover"
                style={{
                    backgroundImage:
                        "url(/assets/templates/general/v1/images/keyhole.png)"
                }}
            />

            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
                <h1>{data.bride} & {data.groom}</h1>
                <p>{data.date}</p>
                <p>kjdkdskdfs</p>

            </div>

        </div></div>
    )
}

export default Home