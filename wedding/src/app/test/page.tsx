"use client"

import { AtSign, User } from "lucide-react"

import RSVP, { ConfirmOverlay } from "@/templates/shared/components/RSVP"

export default function Page() {
  return (
    <div className="min-h-screen bg-[#f5f4ec] py-10">
      <RSVP
        accentColor="#c3c2a0"
        birdAnimationSrc="/images/templates/v1/bird.gif"
        confirmOverlay={ConfirmOverlay}
        guestStepperButtonClassName="bg-[#e8a4a8]"
        guestNumberClassName="text-gray-500"
        guestIconClassName="text-[#f7f3e8] w-[14px] h-[14px]"
        title="The Celebration"
        titleClassName="text-[23px] text-[#676a26] whitespace-nowrap"
        introText={
          <>
            Please be so kind as to confirm your attendance by submitting your RSVP no
            later than April&nbsp;1st, so that we can make the necessary arrangements
            and plan accordingly for all our guests.
          </>
        }
        nameField={{
          icon: <User size={22} color="white" />,
          placeholder: "Full Name",
          autoComplete: "name",
          type: "text",
        }}
        emailField={{
          icon: <AtSign size={22} color="white" />,
          placeholder: "e-mail address",
          autoComplete: "email",
          type: "email",
        }}
      />
    </div>
  )
}
