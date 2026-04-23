"use client"

import { AtSign, User } from "lucide-react"

import RSVP, { ConfirmOverlay } from "@/templates/shared/components/RSVP"
import type { V1RSVPData } from "@/templates/general/v1/types/Invitation"

const V1_ACCENT_COLOR = "rgba(195,194,160,1)"

export default function RSVPPage({ data }: { data: V1RSVPData }) {
  return (
    <RSVP
      accentColor={V1_ACCENT_COLOR}
      acceptButtonLabel="Joyfylly Accept"
      animateTitle
      birdAnimationAlt="bird"
      birdAnimationSrc={data.birdAnimationSrc}
      confirmOverlay={ConfirmOverlay}
      declineButtonLabel="Gracefully Decline"
      guestDescription="Please indicate the total number of people, including yourself and all family members or guests."
      guestIconClassName="text-white"
      guestNumberClassName="text-[#3a3a2e]"
      guestStepperButtonClassName="bg-[#e8a4a8]"
      title="The Celebration"
      titleClassName="text-[1.1rem] text-[#676a26] whitespace-nowrap"
      introText={
        <>
          Please be so kind as to confirm your attendance by submitting your RSVP no
          later than April&nbsp;1st, so that we can make the necessary arrangements
          and plan accordingly for all our guests.
        </>
      }
      nameField={{
        autoComplete: "name",
        icon: <User size={22} color="white" />,
        placeholder: "Full Name",
        type: "text",
      }}
      emailField={{
        autoComplete: "email",
        icon: <AtSign size={22} color="white" />,
        placeholder: "e-mail address",
        type: "email",
      }}
      wishesPlaceholder="Share your wishes..."
    />
  )
}
