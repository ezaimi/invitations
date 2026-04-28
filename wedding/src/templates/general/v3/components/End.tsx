import Image from 'next/image'
import React from 'react'

function End() {
    return (
        <div className="text-center relative">
            <div className='absolute font-serenity right-12 top-30 text-[1.5rem]'>
                <p>Let’s</p>
                <p className='font-belleza'>celebrate</p>
                <p>together</p>
            </div>

            <p className='font-burgues text-[25rem] text-[#76220b] tracking-[-0.05em] [font-kerning:normal]'>
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