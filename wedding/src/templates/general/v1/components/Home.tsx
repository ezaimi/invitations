"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import type { V1HomeData } from "@/templates/general/v1/types/Invitation"
import Image from "next/image"

async function waitForImageReady(image: HTMLImageElement) {
  if (image.complete && image.naturalWidth > 0) {
    if (typeof image.decode === "function") {
      await image.decode().catch(() => {})
    }
    return
  }

  await new Promise<void>((resolve) => {
    const finish = () => {
      image.removeEventListener("load", handleLoad)
      image.removeEventListener("error", handleError)
      resolve()
    }

    const handleLoad = () => {
      if (typeof image.decode === "function") {
        image.decode().catch(() => {}).finally(finish)
        return
      }

      finish()
    }

    const handleError = () => {
      finish()
    }

    image.addEventListener("load", handleLoad, { once: true })
    image.addEventListener("error", handleError, { once: true })
  })
}

function Home({ data }: { data: V1HomeData }) {
  const { brideName, groomName, dateText, videoSrc } = data
  const namesText = `${brideName} & ${groomName}`
  const dateParts = dateText.split(".")
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false)

  const posterRef   = useRef<HTMLDivElement>(null)
  const coupleRef   = useRef<HTMLDivElement>(null)
  const videoRef    = useRef<HTMLVideoElement>(null)
  const displaceRef = useRef<SVGFEDisplacementMapElement>(null)
  const namesRef    = useRef<HTMLHeadingElement>(null)
  const dateRef     = useRef<HTMLParagraphElement>(null)
  const hasRepeatedRef = useRef(false)
  const hasRevealedVideoRef = useRef(false)

  useEffect(() => {
    const poster   = posterRef.current
    const couple   = coupleRef.current
    const video    = videoRef.current
    const displace = displaceRef.current
    const namesEl  = namesRef.current
    const dateEl   = dateRef.current
    if (!poster || !couple || !video || !displace || !namesEl || !dateEl) return

    hasRepeatedRef.current = false
    hasRevealedVideoRef.current = false
    let isCancelled = false
    let heroTimeline: gsap.core.Timeline | null = null

    const nameChars = namesEl.querySelectorAll(".home-name-char")
    const datePieces = dateEl.querySelectorAll(".home-date-part")
    const posterImage = poster.querySelector("img")
    const coupleImage = couple.querySelector("img")
    if (!posterImage || !coupleImage) return

    gsap.set(nameChars, {
      opacity: 0,
      y: 10,
      filter: "blur(3px)",
    })

    gsap.set(datePieces, {
      opacity: 0,
      y: 12,
    })

    gsap.set([poster, couple, video], {
      force3D: true,
    })

    void Promise.all([
      waitForImageReady(posterImage),
      waitForImageReady(coupleImage),
    ]).then(() => {
      if (isCancelled) return

      setShouldLoadVideo(true)

      heroTimeline = gsap.timeline({ delay: 0.15 })
        .to(poster, {
          scale: 7,
          duration: 2.5,
          ease: "power2.in",
        })
        .to(
          nameChars,
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.95"
        )
        .to(
          datePieces,
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.22,
            ease: "power2.out",
          },
          "-=1.1"
        )
    })

    const revealVideo = () => {
      if (isCancelled || hasRevealedVideoRef.current) return

      hasRevealedVideoRef.current = true

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

    const replayVideoOnce = () => {
      if (isCancelled || hasRepeatedRef.current) return

      hasRepeatedRef.current = true
      video.currentTime = 0
      void video.play().catch(() => {})
    }

    video.addEventListener("loadeddata", revealVideo, { once: true })
    video.addEventListener("ended", replayVideoOnce)

    if (video.readyState >= 2) {
      revealVideo()
    }

    return () => {
      isCancelled = true
      heroTimeline?.kill()
      video.removeEventListener("loadeddata", revealVideo)
      video.removeEventListener("ended", replayVideoOnce)
    }
  }, [])

  useEffect(() => {
    if (!shouldLoadVideo || !videoRef.current) return

    videoRef.current.load()
  }, [shouldLoadVideo])

  return (
    <section
      className="relative h-[105vh] overflow-hidden bg-[#f2ece8]"
    >
      <div className="absolute inset-x-0 top-16 z-[7] flex flex-col items-center px-6 text-center">
        <h1
          ref={namesRef}
          className="whitespace-nowrap font-slight text-[2rem] leading-none text-[#676a26] sm:text-[3rem]"
        >
          {namesText.split("").map((char, index) => (
            <span key={`${char}-${index}`} className="home-name-char inline-block">
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>
      
        <p
          ref={dateRef}
          className="mt-5 flex items-center gap-1 font-serenity text-[1.5rem] leading-none text-[#676a26] sm:text-[2rem]"
        >
          {dateParts.map((part, index) => (
            <span key={`${part}-${index}`} className="flex items-center">
              <span className="home-date-part inline-block">{part}</span>
              {index < dateParts.length - 1 ? <span>.</span> : null}
            </span>
          ))}
        </p>
      </div>

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

      {/* Couple image */}
      <div ref={coupleRef} className="absolute inset-0 z-5">
        <Image
          src="/images/templates/v1/couple.png"
          alt={`${brideName} and ${groomName}`}
          fill
          priority
          fetchPriority="high"
          loading="eager"
          sizes="100vw"
          className="object-cover"
          style={{ filter: "url(#glass-water)", transform: "scale(1.05)" }}
        />
      </div>

      {/* Video — crossfades in as couple fades out */}
      <video
        ref={videoRef}
        className="absolute inset-x-0  h-full w-full bg-[#f2ece8] object-cover opacity-0"
        muted
        playsInline
        preload="none"
      >
        {shouldLoadVideo ? <source src={videoSrc} type="video/mp4" /> : null}
      </video>

      {/* Keyhole frame — rushes forward */}
      <div ref={posterRef} className="absolute inset-0 z-10 will-change-transform">
        <Image
          src="/images/templates/v1/keyhole_bg.png"
          alt=""
          fill
          priority
          fetchPriority="high"
          loading="eager"
          sizes="100vw"
          className="object-cover"

        />
      </div>

    </section>
  )
}

export default Home
