import DividerText from "../../../../shared/components/DividerText"
import DressCode from "./DressCode";
import Map from "./Map";
import RingsAnimation from "./RingAnnimation";
import DateAnimation from "./DateAnimation";
import Flowers from "./Flowers";
import Image from "next/image"
import FrontFlowers from "./FrontFlowers";

function Details() {
    return (
        <div className='bg-[#c3c2a0] flex flex-col items-center relative h-420 rounded-b-full min-[501px]:rounded-b-none max-[500px]:mb-6 '>

            <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-12">
                <RingsAnimation />
            </div>

            <div className="max-w-[500px] px-3 pb-3 rounded-b-[250px] flex flex-col h-full">

                <div className="flex flex-col items-center mt-14 ">
                    <h1 className="text-[#676a26] text-[2.50rem] font-serenity">Our Special Day</h1>
                    <p className="text-white text-center text-[1.1rem] font-belleza mt-2 px-2.5">
                        Your presence would mean the world to us as we gather to celebrate this unforgettable moment.
                    </p>
                </div>

                <div className="h-320  mt-auto relative">
                    <div className="absolute top-0 -mt-10 left-0 z-0 pointer-events-none w-full">
                        <Flowers />
                    </div>
                    <div>
                        <FrontFlowers />
                    </div>
                    <div className="z-20 relative  bg-[#fffdf6] rounded-full h-full  flex flex-col justify-around items-center min-[500px]:mb-6">
                        <header className="text-[#676a26] mt-11">
                            <DividerText text="Save the date" />
                        </header>
                        <DateAnimation />
                        <div className="-mt-5">
                            <Map />
                        </div>
                        <div className="-mt-10">
                            <DressCode />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Details