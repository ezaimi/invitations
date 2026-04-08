"use client";

import Image from "next/image";

export default function Intro() {
  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-center bg-[#e9e6dd] px-6 py-12">

      {/* Frame with slideshow inside */}
      <div className="relative w-[320px] sm:w-[400px] md:w-[480px]">

        {/* Inner images (behind frame) */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[70%] h-[70%] overflow-hidden rounded-full">
            {/* Replace with your slideshow logic */}
            <Image
              src="/images/couple1.jpg"
              alt="couple"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Frame PNG (transparent inside) */}
        <Image
          src="/images/frame.png"
          alt="frame"
          width={600}
          height={800}
          className="relative z-10 w-full h-auto"
        />
      </div>

      {/* Names */}
      <h1
        className="mt-10 text-center text-black text-[48px] sm:text-[64px]"
        style={{ fontFamily: "var(--font-burgues)" }}
      >
        Fara & James
      </h1>

      {/* Intro text */}
      <p
        className="mt-6 text-center max-w-[500px] text-[16px] sm:text-[18px]"
        style={{
          fontFamily: "var(--font-suranna)",
          color: "#60683e",
        }}
      >
        We joyfully invite you to share
        <br />
        in our celebration of love and commitment,
        <br />
        as we begin this new chapter together
        <br />
        surrounded by those who mean the most to us.
      </p>

      {/* Date */}
      <div
        className="mt-10 text-[28px] sm:text-[36px] tracking-[0.3em]"
        style={{
          fontFamily: "var(--font-belleza)",
          color: "#60683e",
        }}
      >
        22 - 07 - 26
      </div>
    </section>
  );
}
