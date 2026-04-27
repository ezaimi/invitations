"use client"

import { useEffect, useRef, useState } from "react"
import type { InputHTMLAttributes, ReactNode } from "react"

import { withAlpha } from "./color"

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  accentColor: string
  backgroundColor?: string
  containerClassName?: string
  focusRingColor?: string
  icon: ReactNode
  iconWrapperClassName?: string
  inputClassName?: string
}

export default function InputField({
  accentColor,
  backgroundColor,
  containerClassName,
  focusRingColor,
  icon,
  iconWrapperClassName,
  inputClassName,
  placeholder,
  ...inputProps
}: InputFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isFocused, setIsFocused] = useState(false)

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
      className={`flex items-center rounded-full overflow-hidden transition-shadow duration-200 ${containerClassName ?? ""}`}
      style={{
        backgroundColor: backgroundColor ?? withAlpha(accentColor, 39),
        boxShadow: isFocused
          ? `0 0 0 2px ${focusRingColor ?? withAlpha(accentColor, 70)}`
          : undefined,
      }}
    >
      <div
        className={`w-14 h-14 min-w-[56px] m-1 rounded-full flex items-center justify-center ${iconWrapperClassName ?? ""}`}
        style={{ backgroundColor: accentColor }}
      >
        {icon}
      </div>
      <input
        ref={inputRef}
        {...inputProps}
        placeholder=""
        onFocus={(event) => {
          setIsFocused(true)
          inputProps.onFocus?.(event)
        }}
        onBlur={(event) => {
          setIsFocused(false)
          inputProps.onBlur?.(event)
        }}
        className={`flex-1 bg-transparent border-none outline-none text-base text-[#3a3a2e] placeholder-[#5a5a48] caret-[#3a3a2e] py-4 pr-5 pl-3 ${inputClassName ?? ""}`}
        style={{ fontFamily: "var(--font-belleza)" }}
      />
    </div>
  )
}
