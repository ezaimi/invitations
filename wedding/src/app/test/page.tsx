import Hero from "@/templates/general/v1/components/Hero";
import Schedule from "@/templates/general/v1/components/Schedule";
import DressCode from "@/templates/general/v1/components/DressCode";
import Location from "@/templates/general/v1/components/Location";
import Countdown from "@/templates/general/v1/components/Countdown";
import RSVP from "@/templates/general/v1/components/RSVP";

export default function Home() {
  return (
    <main className="bg-[#e6dfd3] min-h-screen text-[#2c3e50] p-5">
      {/* <Hero />
      <Schedule />
      <DressCode />
      <Location />
      */}
      {/* <Schedule/>
      <RSVP />
      <Countdown />  */}
      <div className="bg-amber-400 h-[200px] flex flex-col justify-end h-[200vh]">
        <div className="bg-red-400 h-[40px] ">
          <div className=" h-[20px] w-3 fixed top-0 mb-3 right-1/2  bg-fuchsia-700"> 
          <div className=" bg-blue-400">1</div>
           <div className="mb-6 bg-green-400">1</div>
          
          </div>
        </div>
   
      </div>


    </main>
  );
}