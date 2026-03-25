import Hero from "@/templates/general/v1/components/Hero";
import Schedule from "@/templates/general/v1/components/Schedule";
import DressCode from "@/templates/general/v1/components/DressCode";
import Location from "@/templates/general/v1/components/Location";
import Countdown from "@/templates/general/v1/components/Countdown";
import RSVP from "@/templates/general/v1/components/RSVP";

export default function Home() {
  return (
    <main className="bg-[#e6dfd3] min-h-screen text-[#2c3e50]">
      <Hero />
      <Schedule />
      <DressCode />
      <Location />
      <Countdown />
      <RSVP />
    </main>
  );
}