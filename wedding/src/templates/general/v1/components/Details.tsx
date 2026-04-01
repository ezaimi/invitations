import DividerText from "./DividerText"
import DressCode from "./DressCode"
import Map from "./Map"
function Details() {
    return (
        <div className='h-400 relative bg-[#c3c2a0] rounded-b-[250px] mb-12 flex flex-col px-5 pb-5'>

            <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-3 text-red-500">
                Unazat
            </div>

            <div className="flex flex-col items-center jus mt-10 text-red-500">
                <h1 className="text-[#676a26] text-[2.50rem] font-serenity">Our Special Day</h1>
                <p className="text-white flex text-center font-belleza mt-2">Your presence would mean the world to us as we gather to celebrate this unforgettable moment.</p>
            </div>

            <div className="h-[80%] bg-[#fffdf6] rounded-[190px] mt-auto flex flex-col justify-around items-center">
                <DividerText text="Save the date" />
                <time dateTime="2026-07-22" className="flex flex-col items-center font-serenity text-[#676a26] text-[6rem] leading-[1.3]">
                    <span>22</span>
                    <span>07</span>
                    <span>26</span>
                </time>
                <div>
                    <Map />
                </div>
                <div className="-mt-10">
                    <DressCode />
                </div>
            </div>
        </div>
    )
}

export default Details