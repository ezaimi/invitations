"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import type { Invitation } from "@/templates/general/v1/types/Invitation"
import Image from "next/image"

function Home({ data }: { data: Invitation }) {
  void data

  const posterRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const revealStartedRef = useRef(false)

  useEffect(() => {
    const videoHref = "/images/templates/v1/couple.mp4"
    const preloadLink = document.createElement("link")
    preloadLink.rel = "preload"
    preloadLink.as = "video"
    preloadLink.href = videoHref
    preloadLink.type = "video/mp4"
    document.head.appendChild(preloadLink)

    return () => {
      document.head.removeChild(preloadLink)
    }
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.load()
  }, [])

  const revealVideo = () => {
    if (revealStartedRef.current) return

    const poster = posterRef.current
    const video = videoRef.current
    if (!poster || !video) return

    revealStartedRef.current = true

    // Double rAF ensures the first decoded frame is actually painted
    // before we start the crossfade — prevents the black-frame flash.
    const runAnimation = () => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          void video.play().catch(() => {})

          if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            gsap.set(video, { opacity: 1, scale: 1 })
            gsap.set(poster, { opacity: 0 })
            return
          }

          gsap.set(video, { opacity: 0, scale: 1.06 })

          const tl = gsap.timeline()

          // Poster accelerates toward viewer the whole way through
          tl.to(poster, {
            scale: 2.2,
            duration: 3.0,
            ease: "power3.in",
          }, 0)
          // Fade starts mid-rush — disappears while still flying forward
          .to(poster, {
            opacity: 0,
            duration: 1.0,
            ease: "power1.in",
          }, 1.8)
          // Video fades in underneath
          .to(video, {
            opacity: 1,
            scale: 1,
            duration: 1.4,
            ease: "power2.out",
          }, 1.4)
        })
      })
    }

    runAnimation()
  }

  return (
    <section
        className="relative min-h-screen overflow-hidden"
        style={{ backgroundImage: "url('/images/templates/v1/keyhole_bg.png')", backgroundSize: "cover", backgroundPosition: "center" }}
      >
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

      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover opacity-0"
        muted
        loop
        playsInline
        preload="auto"
        onLoadedData={revealVideo}
      >
        <source src="/images/templates/v1/couple.mp4" type="video/mp4" />
      </video>
    </section>
  )
}

export default Home
