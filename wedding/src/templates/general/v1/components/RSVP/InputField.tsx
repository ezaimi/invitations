"use client"

import { useEffect, useRef } from "react"

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: React.ReactNode
}

export default function InputField({ icon, placeholder, ...inputProps }: InputFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const el = inputRef.current
    if (!el || !placeholder) return

    el.placeholder = ""

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()

        let i = 0
        const type = () => {
          if (i > placeholder.length) return
          el.placeholder = placeholder.slice(0, i)
          i++
          setTimeout(type, 60)
        }
        setTimeout(type, 300)
      },
      { threshold: 0.6 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [placeholder])

  return (
    <div
      className="flex items-center rounded-full overflow-hidden transition-shadow duration-200 focus-within:ring-2 focus-within:ring-[rgba(195,194,160,0.7)]"
      style={{ backgroundColor: "rgba(195,194,160,0.39)" }}
    >
      <div
        className="w-14 h-14 min-w-[56px] rounded-full flex items-center justify-center m-1"
        style={{ backgroundColor: "rgba(195,194,160,1)" }}
      >
        {icon}
      </div>
      <input
        ref={inputRef}
        {...inputProps}
        placeholder=""
        className="flex-1 bg-transparent border-none outline-none text-base text-[#3a3a2e] placeholder-[#5a5a48] caret-[#3a3a2e] py-4 pr-5 pl-3"
        style={{ fontFamily: "var(--font-belleza)" }}
      />
    </div>
  )
}
