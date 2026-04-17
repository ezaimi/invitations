"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import type { Invitation } from "@/templates/general/v1/types/Invitation"
import Image from "next/image"

function Home({ data }: { data: Invitation }) {
  void data

  const posterRef   = useRef<HTMLDivElement>(null)
  const coupleRef   = useRef<HTMLDivElement>(null)
  const videoRef    = useRef<HTMLVideoElement>(null)
  const displaceRef = useRef<SVGFEDisplacementMapElement>(null)

  useEffect(() => {
    const videoHref = "/images/templates/v1/couple.mp4"
    const preloadLink = document.createElement("link")
    preloadLink.rel = "preload"
    preloadLink.as = "video"
    preloadLink.href = videoHref
    preloadLink.type = "video/mp4"
    document.head.appendChild(preloadLink)
    return () => { document.head.removeChild(preloadLink) }
  }, [])

  useEffect(() => {
    const poster   = posterRef.current
    const couple   = coupleRef.current
    const video    = videoRef.current
    const displace = displaceRef.current
    if (!poster || !couple || !video || !displace) return

    video.load()

    gsap.timeline({ delay: 0.3 }).to(poster, {
      scale: 7,
      duration: 2.5,
      ease: "power2.in",
    })

    const revealVideo = () => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          void video.play().catch(() => {})

          const obj = { distortion: 12 }

          gsap.to(video, { opacity: 1, duration: 2.2, ease: "power1.inOut" })

          gsap.to(obj, {
            distortion: 0,
            duration: 2.0,
            ease: "power2.out",
            onUpdate() {
              displace.setAttribute("scale", String(obj.distortion))
            },
          })

          gsap.to(couple, { opacity: 0, duration: 2.2, ease: "power1.inOut" })
        })
      })
    }

    video.addEventListener("loadeddata", revealVideo, { once: true })
    return () => { video.removeEventListener("loadeddata", revealVideo) }
  }, [])

  return (
    <section
      className="relative min-h-screen overflow-hidden"
      style={{
        backgroundImage: "url('/images/templates/v1/keyhole_bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Glass/water distortion filter */}
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <defs>
          <filter id="glass-water" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence
              type="turbulence"
              baseFrequency="0.008"
              numOctaves="3"
              seed="4"
              result="noise"
            />
            <feDisplacementMap
              ref={displaceRef}
              in="SourceGraphic"
              in2="noise"
              scale="12"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Couple image with glass/water look */}
      <div ref={coupleRef} className="absolute inset-0 z-5">
        <Image
          src="/images/templates/v1/couple.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ filter: "url(#glass-water)", transform: "scale(1.05)" }}
        />
      </div>

      {/* Video — crossfades in as couple fades out */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover opacity-0"
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/videos/v1/couple-aisle.mp4" type="video/mp4" />
      </video>

      {/* Keyhole frame — rushes forward */}
      <div ref={posterRef} className="absolute inset-0 z-10 will-change-transform">
        <Image
          src="/images/templates/v1/keyhole_bg.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

    </section>
  )
}

export default Home
