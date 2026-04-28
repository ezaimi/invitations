"use client"

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

function Map() {
    const pinRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const [isMapVisible, setIsMapVisible] = useState(false)

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries
                if (!entry?.isIntersecting) return
                setIsMapVisible(true)
                observer.disconnect()
            },
            { threshold: 0.18 }
        )

        observer.observe(container)
        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        gsap.registerPlugin(MotionPathPlugin, ScrollTrigger)

        if (!pinRef.current || !containerRef.current) return

        const el = pinRef.current
        const container = containerRef.current

        const ctx = gsap.context(() => {
            gsap.set(el, { x: -120, y: -120, scale: 0.7, opacity: 0 })

            const animateIn = () => {
                const tl = gsap.timeline()

                tl.to(el, {
                    motionPath: {
                        path: [
                            { x: -120, y: -120 },
                            { x: 100, y: -80 },
                            { x: -90, y: 90 },
                            { x: 70, y: 40 },
                            { x: -40, y: -30 },
                            { x: 20, y: 10 },
                            { x: 0, y: 0 },
                        ],
                        curviness: 2,
                    },
                    opacity: 1,
                    scale: 1,
                    duration: 2.6,
                    ease: "sine.out",
                }, "-=1.2")
                    .to(el, { y: 6, duration: 0.15, ease: "power1.inOut" })
                    .to(el, { y: 0, duration: 0.15, ease: "power1.inOut" })
            }

            const top = container.getBoundingClientRect().top
            const triggerPoint = window.innerHeight * 0.9

            if (top <= triggerPoint) {
                animateIn()
                return
            }

            ScrollTrigger.create({
                trigger: container,
                start: "top 90%",
                once: true,
                onEnter: animateIn,
            })

            ScrollTrigger.refresh()
        }, containerRef)

        return () => ctx.revert()
    }, [])

    return (
        <div className='space-y-8 py-4 text-center'>
            <div className='font-serenity text-[#4d0c12] text-[2rem]'>The venue</div>
            <p className='text-[#642c2b] px-8 font-belleza text-[0.9rem]'>
                Set along the shores of Lake Como,<br />
                our venue offers a romantic setting of historic architecture, gardens, and panoramic views.
            </p>

            <div ref={containerRef} className='relative px-4'>
                <div
                    ref={pinRef}
                    className="absolute bottom-1/4 left-1/4 z-20 -translate-x-1/2 -translate-y-1/2"
                >
                    <Image
                        src="/images/templates/v3/pin.png"
                        alt="location pin"
                        width={33}
                        height={33}
                        className="w-full object-cover"
                    />
                </div>

                <Image
                    src="/images/templates/v3/map.png"
                    alt="map"
                    width={800}
                    height={600}
                    className={`relative z-0 mt-4 w-full rounded-xl object-cover countdown-reveal ${isMapVisible ? "is-visible" : ""}`}
                />
            </div>

            <button className='bg-[#4d0c12] mt-4 text-white py-4 font-belleza px-8 rounded-full hover:bg-[#642c2b]'>
                Explore the map
            </button>
        </div>
    )
}

export default Map
