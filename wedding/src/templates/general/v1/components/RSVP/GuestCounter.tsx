interface GuestCounterProps {
  count: number
  onChange: (val: number) => void
}

export default function GuestCounter({ count, onChange }: GuestCounterProps) {
  return (
    <div className="flex items-center gap-4">
      <p
        className="flex-1 text-[14.5px] leading-[1.55] text-[#3a3a2e]"
        style={{ fontFamily: "var(--font-belleza)" }}
      >
        Please indicate the total number of people, including yourself and all
        family members or guests.
      </p>
      <div
        className="flex items-center justify-between gap-1 rounded-full px-2 py-1.5 min-w-[112px]"
        style={{ backgroundColor: "rgba(195,194,160,0.39)" }}
      >
        <button
          onClick={() => onChange(Math.max(1, count - 1))}
          aria-label="Decrease guests"
          className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xl leading-none transition-all duration-150 active:scale-90 select-none"
          style={{ backgroundColor: "#e8a4a8", fontFamily: "var(--font-belleza)" }}
        >
          −
        </button>
        <span
          className="text-[18px] text-[#3a3a2e] min-w-[24px] text-center select-none"
          style={{ fontFamily: "var(--font-belleza)" }}
        >
          {count}
        </span>
        <button
          onClick={() => onChange(Math.min(20, count + 1))}
          aria-label="Increase guests"
          className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xl leading-none transition-all duration-150 active:scale-90 select-none"
          style={{ backgroundColor: "#e8a4a8", fontFamily: "var(--font-belleza)" }}
        >
          +
        </button>
      </div>
    </div>
  )
}
