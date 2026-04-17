"use client"

import { useState, useRef, useEffect } from "react"
import DividerText from "@/templates/shared/components/DividerText"
import { User, AtSign } from "lucide-react"
import InputField from "./InputField"
import GuestCounter from "./GuestCounter"
import ConfirmOverlay from "./ConfirmOverlay"
import SquareMotion from "./SquareMotion"

export default function RSVPPage() {
  const [guestCount, setGuestCount] = useState(1)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [wishes, setWishes] = useState("")
  const [overlay, setOverlay] = useState<"accept" | "decline" | null>(null)
  const [animating, setAnimating] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const wishesRef  = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const revealItems = Array.from(section.querySelectorAll(".reveal"))
    if (!revealItems.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add("is-visible")
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    )

    revealItems.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const el = wishesRef.current
    if (!el) return
    const placeholder = "Share your wishes..."
    el.placeholder = ""
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        let i = 0
        const type = () => {
          if (i > placeholder.length) return
          el.placeholder = placeholder.slice(0, i)
          i++
          setTimeout(type, 60)
        }
        setTimeout(type, 300)
      },
      { threshold: 0.6 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  function handleAccept() {
    setAnimating(true)
  }

  function handleAnimationComplete() {
    setAnimating(false)
    setOverlay("accept")
  }

  return (
    <>
      <main className="flex justify-center relative">
        <div
          ref={sectionRef}
          className="relative overflow-visible w-full soace-y-5 h-200 space-y-6 px-7 py-12 flex flex-col max-w-[500px]"
        >
          <SquareMotion
            buttonRef={buttonRef}
            containerRef={sectionRef}
            trigger={animating}
            onComplete={handleAnimationComplete}
          />

          <header className="text-center space-y-5 reveal reveal-1">
            <div className="text-[24rem]">
              <DividerText text="The Celebration" />
            </div>
            <p
              className="text-[15.5px] leading-[1.65] text-[#3a3a2e] px-1"
              style={{ fontFamily: "var(--font-belleza)" }}
            >
              Please be so kind as to confirm your attendance by submitting your
              RSVP no later than April&nbsp;1st, so that we can make the necessary
              arrangements and plan accordingly for all our guests.
            </p>
          </header>

          <div className="flex flex-col gap-4">
            <div className="reveal reveal-2">
              <InputField
                icon={<User size={22} color="white" />}
                type="text"
                placeholder="Full Name"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="reveal reveal-3">
              <InputField
                icon={<AtSign size={22} color="white" />}
                type="email"
                placeholder="e-mail address"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="reveal reveal-4">
            <GuestCounter count={guestCount} onChange={setGuestCount} />
          </div>

          <div
            className="mt-5 rounded-[20px] px-5 py-5 reveal reveal-5"
            style={{ backgroundColor: "rgba(195,194,160,0.39)" }}
          >
            <textarea
              ref={wishesRef}
              rows={6}
              value={wishes}
              onChange={(e) => setWishes(e.target.value)}
              className="w-full bg-transparent border-none outline-none resize-none text-[15.5px] leading-[1.6] text-[#3a3a2e] placeholder-[#5a5a48] caret-[#3a3a2e] focus:ring-0"
              style={{ fontFamily: "var(--font-belleza)" }}
            />
          </div>

          <div className="mt-7 flex gap-3.5 reveal reveal-6">
            <button
              ref={buttonRef}
              onClick={handleAccept}
              className="flex-1 py-[18px] rounded-full text-white text-[15px] tracking-wide transition-all duration-150 active:scale-[0.97] active:opacity-90"
              style={{ backgroundColor: "rgba(195,194,160,1)", fontFamily: "var(--font-belleza)" }}
            >
              Joyfylly Accept
            </button>
            <button
              onClick={() => setOverlay("decline")}
              className="flex-1 py-[18px] rounded-full text-white text-[15px] tracking-wide transition-all duration-150 active:scale-[0.97] active:opacity-90"
              style={{ backgroundColor: "rgba(195,194,160,1)", fontFamily: "var(--font-belleza)" }}
            >
              Gracefully Decline
            </button>
          </div>
        </div>

      </main>

      {overlay && (
        <ConfirmOverlay type={overlay} onClose={() => setOverlay(null)} />
      )}
    </>
  )
}
