"use client"

import { AtSign, Mail, User } from "lucide-react"

import RSVP, { ConfirmOverlay } from "@/templates/shared/components/RSVP"
import SharedSchedule from "@/templates/shared/components/Schedule"
import SectionTitle from "@/templates/general/v2/components/Header"
import SectionSubtitle from "@/templates/general/v2/components/Subtitle"
import EndSection from "@/templates/general/v2/components/End"

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

      <SharedSchedule
        title="The Day Unfolds"
        titleClassName="text-[1.1rem] text-[#676a26] whitespace-nowrap"
        timeClassName="font-serenity text-[#bf777c] text-[1.5rem]"
        valueTitleClassName="text-[2rem] tracking-wider font-perandory-condensed text-[#4a4a4a]"
        descriptionClassName="font-belleza px-2 text-[#4a4a4a]"
        lineClassName="w-[2px] h-16 bg-[#676a26]"
        items={[
          {
            time: "17:30",
            title: "GUEST ARRIVAL",
            description:
              "Please arrive, find your seats, and settle in as we prepare to begin the ceremony.",
          },
          {
            time: "18:00",
            title: "CEREMONY",
            description:
              "Join us as we exchange our vows and celebrate the start of our life together.",
          },
          {
            time: "19:00",
            title: "COCKTAIL HOUR",
            description:
              "Enjoy a selection of drinks and light bites while mingling with family and friends.",
          },
          {
            time: "20:00",
            title: "PARTY & DINNER",
            description:
              "Celebrate with us on the dance floor as we enjoy music, laughter, and the evening together.",
          },
        ]}
      />

      <SharedSchedule
        animateTitle={false}
        title={<SectionTitle>THE DAY UNFOLDS</SectionTitle>}
        titleClassName="w-full"
        sectionClassName="w-full bg-[#f3f1e6] flex flex-col items-center pt-7 pb-20 text-center"
        titleWrapperClassName="w-full"
        itemsWrapperClassName="mt-12 flex flex-col items-center gap-5 px-6 max-w-[600px]"
        itemClassName="flex flex-col items-center"
        timeClassName="text-[#60683e] text-[24px] sm:text-[34px] font-serenity"
        valueTitleClassName="text-[27px] sm:text-[26px] font-perandory-condensed"
        descriptionClassName="mt-1 text-[14px] sm:text-[16px] text-gray-600 leading-[1.4] font-belleza mx-10"
        lineWrapperClassName="mt-5"
        lineClassName="h-8 w-[2px] bg-[#60683e]/40"
        items={[
          {
            time: "17:30",
            title: "GUEST ARRIVAL",
            description:
              "Please arrive, find your seats, and settle in as we prepare to begin the ceremony.",
          },
          {
            time: "18:00",
            title: "CEREMONY",
            description:
              "Join us as we exchange our vows and celebrate the start of our life together.",
          },
          {
            time: "19:00",
            title: "COCKTAIL HOUR",
            description:
              "Enjoy a selection of drinks and light bites while mingling with family and friends.",
          },
          {
            time: "20:00",
            title: "PARTY & DINNER",
            description:
              "Celebrate with us on the dance floor as we enjoy music, laughter, and the evening together.",
          },
        ]}
      />

      <RSVP
        accentColor="#60683e"
        actionButtonClassName="text-[16px] py-4"
        buttonsRowClassName="w-full gap-3 mt-8"
        contentClassName="max-w-[600px] px-6 py-0"
        fieldBackgroundColor="rgba(168,165,133,0.7)"
        fieldContainerClassName=""
        fieldIconWrapperClassName="mr-4"
        fieldInputClassName="text-gray-700 placeholder-gray-600"
        fieldsWrapperClassName="!mt-3 gap-6"
        guestContainerClassName="justify-between mt-4"
        guestDescription="Please indicate the total number of people, including yourself and all family members or guests."
        guestDescriptionClassName="text-left max-w-[55%] ml-4 !text-[#60683e] font-belleza !text-[13px] sm:!text-[1.1rem] !leading-[1.55]"
        guestIconClassName="w-4 h-4"
        guestNumberClassName="text-[18px]"
        guestStepperButtonClassName="bg-[#60683e] w-8 h-8"
        guestStepperClassName="px-4 py-3 gap-4"
        guestStepperSurfaceColor="rgba(168,165,133,0.7)"
        headerClassName="max-w-[700px]"
        wishesWrapperClassName="hidden"
        headerContent={
          <>
            <SectionTitle>JOIN US</SectionTitle>
            <SectionSubtitle className="!text-[#60683e] mt-1 !text-[13px] sm:!text-[1.1rem] !leading-[1.55]">
              Please be so kind as to confirm your attendance no later than May 1st,
              so that we can make the necessary arrangements and plan accordingly for
              all our guests.
            </SectionSubtitle>
          </>
        }
        introText=""
        introTextClassName="hidden"
        mainClassName="w-full bg-[#f3f1e6] pt-14 pb-20"
        nameField={{
          icon: <User className="text-white w-4 h-4" />,
          placeholder: "Full Name",
          autoComplete: "name",
          type: "text",
        }}
        emailField={{
          icon: <Mail className="text-white w-4 h-4" />,
          placeholder: "e-mail address",
          autoComplete: "email",
          type: "email",
        }}
        wishesPlaceholder="Share your wishes..."
      />

      <div>
        <EndSection/>
      </div>

    </div>


  )
}
