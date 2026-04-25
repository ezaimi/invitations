"use client";
import { Mail, User } from "lucide-react";

import SharedRSVP from "@/templates/shared/components/RSVP";
import SectionSubtitle from "./Subtitle";
import SectionTitle from "./Header";

export default function RSVP() {
  return (
    <SharedRSVP
      accentColor="#60683e"
      actionButtonClassName="text-[16px] py-4"
      buttonsRowClassName="w-full gap-3 mt-8"
      contentClassName="max-w-[600px] px-6 py-0"
      fieldBackgroundColor="rgba(168,165,133,0.7)"
      fieldContainerClassName="py-2"
      fieldIconWrapperClassName="!w-11 !h-11 !min-w-11 ml-4"
      fieldInputClassName="text-gray-700 placeholder-gray-600"
      fieldsWrapperClassName="!mt-3 gap-6"
      guestContainerClassName="justify-between mt-4 px-0 "
      guestDescription={
        <>
          Please indicate the total number
         
          of people, including yourself and all family members or guests.
        </>
      }
      guestDescriptionClassName="text-left ml-4 !text-[#60683e] font-belleza !text-[13px] sm:!text-[1.1rem] !leading-[1.55]"
      guestIconClassName="w-4 h-4"
      guestNumberClassName="text-[18px]"
      guestStepperButtonClassName="bg-[#60683e] !w-8 !h-8"
      guestStepperClassName="px-4 py-3 gap-2 "
      guestStepperSurfaceColor="rgba(168,165,133,0.7)"
      headerClassName="max-w-[700px]"
      wishesWrapperClassName="hidden"
      headerContent={
        <>
          <SectionTitle animate>JOIN US</SectionTitle>
          <SectionSubtitle className="!text-[#60683e] mt-1 !text-[13px] sm:!text-[1.1rem] !leading-[1.55]">
            Please be so kind as to confirm your attendance no later than  <br/>May 1st,
            so that we can make the necessary arrangements and plan accordingly for
            all our guests.
          </SectionSubtitle>
        </>
      }
      introText=""
      introTextClassName="hidden"
      mainClassName="w-full bg-[#f3f1e6] pt-14 pb-20"
      nameField={{
        icon: <User className="text-white w-5 h-5" />,
        placeholder: "Full Name",
        autoComplete: "name",
        type: "text",
      }}
      emailField={{
        icon: <Mail className="text-white w-5 h-5" />,
        placeholder: "e-mail address",
        autoComplete: "email",
        type: "email",
      }}
      wishesPlaceholder="Share your wishes..."
    />
  );
}
