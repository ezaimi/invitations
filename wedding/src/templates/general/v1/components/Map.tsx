import React from 'react'
import DividerText from './DividerText';
import Image from "next/image";
import { MapPin, Send } from "lucide-react";

function Map() {
  return (
    <div className='flex flex-col items-center'>

      <DividerText text="Find us here" />

      <Image
        src="/images/templetes/v1/image.png"
        alt="map"
        width={220}
        height={50}
        className="w-full  object-cover rounded-xl mt-4"
      />

      <div className="flex items-center justify-between bg-[#f3f3f0] rounded-2xl px-4 py-2 shadow-sm mt-4 w-full mx-1 ">

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#d9e2d3] -ml-2 flex items-center justify-center">
            <MapPin className="w-4 h-4 text-[#6f7f5c]" />
          </div>

          <div className="min-w-0 max-w-[140px]">
            <h3 className="text-[#2e2e2e] text-[0.7rem] font-medium truncate">
              Rose Garden Estate
            </h3>
            <p className="text-[#8a8a8a] text-[0.5rem] truncate">
              16621 Lathrop Dr, Yorba Linda djhsdj kjsddhsdh
            </p>
          </div>
        </div>


        <button className="flex items-center -mr-2 gap-2 bg-[#6f7f5c] text-[#f0ecec] text-[0.6rem] px-4 py-2 rounded-full hover:opacity-90 transition">
          <Send className="w-4 h-4" />
          DIRECTIONS
        </button>
      </div>

    </div>
  )
}

export default Map