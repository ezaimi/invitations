"use client"

import { useEffect, useRef, useState } from "react"
import type { ComponentType, ReactNode } from "react"
import { AtSign, User } from "lucide-react"

import DividerText from "@/templates/shared/components/DividerText"

import DefaultConfirmOverlay from "./ConfirmOverlay"
import type { ConfirmOverlayProps } from "./ConfirmOverlay"
import GuestCounter from "./GuestCounter"
import InputField from "./InputField"
import SquareMotion from "./SquareMotion"
import { withAlpha } from "./color"
import type { RSVPFieldConfig, RSVPOverlayContent } from "./types"

export type { ConfirmOverlayProps }
export { default as ConfirmOverlay } from "./ConfirmOverlay"

export interface SharedRSVPProps {
  accentColor?: string
  acceptButtonLabel?: string
  acceptOverlay?: RSVPOverlayContent
  animateTitle?: boolean
  birdAnimationAlt?: string
  confirmOverlay?: ComponentType<ConfirmOverlayProps>
  birdAnimationSrc?: string
  declineButtonLabel?: string
  declineOverlay?: RSVPOverlayContent
  emailField?: RSVPFieldConfig
  guestDescription?: string
  guestIconClassName?: string
  guestNumberClassName?: string
  guestStepperBackgroundColor?: string
  guestStepperButtonClassName?: string
  headerContent?: ReactNode
  introText?: ReactNode
  nameField?: RSVPFieldConfig
  title?: string
  titleClassName?: string
  wishesPlaceholder?: string
}

const DEFAULT_ACCENT_COLOR = "rgba(195,194,160,1)"

const DEFAULT_ACCEPT_OVERLAY: RSVPOverlayContent = {
  title: "Joyfully accepted!",
  message: "We're so happy you'll be joining us.\nWe look forward to celebrating with you!",
}

const DEFAULT_DECLINE_OVERLAY: RSVPOverlayContent = {
  title: "Gracefully noted.",
  message: "We're sorry you can't make it,\nbut we appreciate you letting us know.",
}

export default function RSVPPage({
  accentColor = DEFAULT_ACCENT_COLOR,
  acceptButtonLabel = "Joyfylly Accept",
  acceptOverlay = DEFAULT_ACCEPT_OVERLAY,
  animateTitle = false,
  birdAnimationAlt = "bird",
  confirmOverlay: ConfirmOverlay = DefaultConfirmOverlay,
  birdAnimationSrc,
  declineButtonLabel = "Gracefully Decline",
  declineOverlay = DEFAULT_DECLINE_OVERLAY,
  emailField,
  guestDescription = "Please indicate the total number of people, including yourself and all family members or guests.",
  guestIconClassName = "",
  guestNumberClassName = "",
  guestStepperBackgroundColor = accentColor,
  guestStepperButtonClassName = "",
  headerContent,
  introText = (
    <>
      Please be so kind as to confirm your attendance by submitting your RSVP no
      later than April&nbsp;1st, so that we can make the necessary arrangements and
      plan accordingly for all our guests.
    </>
  ),
  nameField,
  title = "The Celebration",
  titleClassName,
  wishesPlaceholder = "Share your wishes...",
}: SharedRSVPProps) {
  const [guestCount, setGuestCount] = useState(1)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [wishes, setWishes] = useState("")
  const [overlay, setOverlay] = useState<"accept" | "decline" | null>(null)
  const [animating, setAnimating] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const wishesRef = useRef<HTMLTextAreaElement>(null)

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

    el.placeholder = ""

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()

        let i = 0
        const type = () => {
          if (i > wishesPlaceholder.length) return
          el.placeholder = wishesPlaceholder.slice(0, i)
          i++
          setTimeout(type, 60)
        }

        setTimeout(type, 300)
      },
      { threshold: 0.6 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [wishesPlaceholder])

  function handleAccept() {
    if (!birdAnimationSrc) {
      setOverlay("accept")
      return
    }

    setAnimating(true)
  }

  function handleAnimationComplete() {
    setAnimating(false)
    setOverlay("accept")
  }

  const resolvedNameField: Required<RSVPFieldConfig> = {
    autoComplete: nameField?.autoComplete ?? "name",
    icon: nameField?.icon ?? <User size={22} color="white" />,
    placeholder: nameField?.placeholder ?? "Full Name",
    type: nameField?.type ?? "text",
  }

  const resolvedEmailField: Required<RSVPFieldConfig> = {
    autoComplete: emailField?.autoComplete ?? "email",
    icon: emailField?.icon ?? <AtSign size={22} color="white" />,
    placeholder: emailField?.placeholder ?? "e-mail address",
    type: emailField?.type ?? "email",
  }

  const renderedHeader = headerContent ?? (
    <DividerText animate={animateTitle} text={title} className={titleClassName} />
  )

  return (
    <>
      <main className="flex justify-center relative">
        <div
          ref={sectionRef}
          className="relative overflow-visible w-full soace-y-5 h-200 space-y-6 px-7 py-12 flex flex-col max-w-[500px]"
        >
          {birdAnimationSrc ? (
            <SquareMotion
              alt={birdAnimationAlt}
              buttonRef={buttonRef}
              containerRef={sectionRef}
              trigger={animating}
              onComplete={handleAnimationComplete}
              src={birdAnimationSrc}
            />
          ) : null}

          <header className="text-center space-y-5 reveal reveal-1">
            {renderedHeader}
            <p
              className="text-[15.5px] leading-[1.65] text-[#3a3a2e] px-1"
              style={{ fontFamily: "var(--font-belleza)" }}
            >
              {introText}
            </p>
          </header>

          <div className="flex flex-col gap-4">
            <div className="reveal reveal-2">
              <InputField
                accentColor={accentColor}
                icon={resolvedNameField.icon}
                type={resolvedNameField.type}
                placeholder={resolvedNameField.placeholder}
                autoComplete={resolvedNameField.autoComplete}
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="reveal reveal-3">
              <InputField
                accentColor={accentColor}
                icon={resolvedEmailField.icon}
                type={resolvedEmailField.type}
                placeholder={resolvedEmailField.placeholder}
                autoComplete={resolvedEmailField.autoComplete}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
          </div>

          <div className="reveal reveal-4">
            <GuestCounter
              accentColor={accentColor}
              buttonBackgroundColor={
                guestStepperButtonClassName ? undefined : guestStepperBackgroundColor
              }
              buttonClassName={guestStepperButtonClassName}
              count={guestCount}
              description={guestDescription}
              iconClassName={guestIconClassName}
              numberClassName={guestNumberClassName}
              onChange={setGuestCount}
            />
          </div>

          <div
            className="mt-5 rounded-[20px] px-5 py-5 reveal reveal-5"
            style={{ backgroundColor: withAlpha(accentColor, 39) }}
          >
            <textarea
              ref={wishesRef}
              rows={6}
              value={wishes}
              onChange={(event) => setWishes(event.target.value)}
              className="w-full overflow-hidden bg-transparent border-none outline-none resize-none text-[15.5px] leading-[1.6] text-[#3a3a2e] placeholder-[#5a5a48] caret-[#3a3a2e] focus:ring-0"
              style={{ fontFamily: "var(--font-belleza)" }}
            />
          </div>

          <div className="mt-7 flex gap-3.5 reveal reveal-6">
            <button
              ref={buttonRef}
              onClick={handleAccept}
              className="flex-1 py-[18px] rounded-full text-white text-[15px] tracking-wide transition-all duration-150 active:scale-[0.97] active:opacity-90"
              style={{ backgroundColor: accentColor, fontFamily: "var(--font-belleza)" }}
            >
              {acceptButtonLabel}
            </button>
            <button
              onClick={() => setOverlay("decline")}
              className="flex-1 py-[18px] rounded-full text-white text-[15px] tracking-wide transition-all duration-150 active:scale-[0.97] active:opacity-90"
              style={{ backgroundColor: accentColor, fontFamily: "var(--font-belleza)" }}
            >
              {declineButtonLabel}
            </button>
          </div>
        </div>
      </main>

      {overlay ? (
        <ConfirmOverlay
          accentColor={accentColor}
          type={overlay}
          acceptContent={acceptOverlay}
          declineContent={declineOverlay}
          onClose={() => setOverlay(null)}
        />
      ) : null}
    </>
  )
}
