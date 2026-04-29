import Image from 'next/image'
import React from 'react'

function End() {
    return (
        <div className="text-center relative">
            <div className="absolute font-serenity right-8 top-35 text-[1.7rem] -space-y-6">
                <p className="tracking-wide">Let&apos;s</p>
                <p className="font-parfumerie text-[3rem] tracking-wide">celebrate</p>
                <p className="tracking-wide">together</p>
            </div>

            <p className="font-burgues text-[25rem] text-[#76220b] tracking-[-0.05em] [font-kerning:normal]">
                love
            </p>
            <div className="w-full h-125 overflow-hidden relative -mt-40">
                <Image
                    src="/images/templates/v3/couple-car.png"
                    alt="end"
                    fill
                    className="object-cover object-top"
                />
            </div>
        </div>
    )
}

export default End
