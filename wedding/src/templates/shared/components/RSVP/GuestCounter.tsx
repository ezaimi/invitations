import { Minus, Plus } from "lucide-react"

import { withAlpha } from "./color"

interface GuestCounterProps {
  accentColor: string
  buttonBackgroundColor?: string
  buttonClassName?: string
  count: number
  description: string
  iconClassName?: string
  numberClassName?: string
  onChange: (val: number) => void
}

export default function GuestCounter({
  accentColor,
  buttonBackgroundColor,
  buttonClassName,
  count,
  description,
  iconClassName,
  numberClassName,
  onChange,
}: GuestCounterProps) {
  return (
    <div className="flex items-center gap-4">
      <p
        className="flex-1 text-[14.5px] leading-[1.55] text-[#3a3a2e]"
        style={{ fontFamily: "var(--font-belleza)" }}
      >
        {description}
      </p>
      <div
        className="flex items-center justify-between gap-1 rounded-full px-2 py-1.5 min-w-[112px]"
        style={{ backgroundColor: withAlpha(accentColor, 39) }}
      >
        <button
          onClick={() => onChange(Math.max(1, count - 1))}
          aria-label="Decrease guests"
          className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-xl leading-none transition-all duration-150 active:scale-90 select-none ${buttonClassName ?? ""}`}
          style={{
            ...(buttonBackgroundColor ? { backgroundColor: buttonBackgroundColor } : {}),
            fontFamily: "var(--font-belleza)",
          }}
        >
          <Minus size={18} strokeWidth={2.2} className={iconClassName} />
        </button>
        <span
          className={`text-[18px] min-w-[24px] text-center select-none text-[#3a3a2e] ${numberClassName ?? ""}`}
          style={{ fontFamily: "var(--font-belleza)" }}
        >
          {count}
        </span>
        <button
          onClick={() => onChange(Math.min(20, count + 1))}
          aria-label="Increase guests"
          className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-xl leading-none transition-all duration-150 active:scale-90 select-none ${buttonClassName ?? ""}`}
          style={{
            ...(buttonBackgroundColor ? { backgroundColor: buttonBackgroundColor } : {}),
            fontFamily: "var(--font-belleza)",
          }}
        >
          <Plus size={18} strokeWidth={2.2} className={iconClassName} />
        </button>
      </div>
    </div>
  )
}
