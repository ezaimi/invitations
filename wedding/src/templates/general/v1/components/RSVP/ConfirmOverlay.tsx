import { Check, X } from "lucide-react"

interface ConfirmOverlayProps {
  type: "accept" | "decline"
  onClose: () => void
}

const CONFIRM_CONTENT = {
  accept: {
    title: "Joyfully accepted!",
    message: "We're so happy you'll be joining us.\nWe look forward to celebrating with you!",
    icon: <Check size={36} color="white" strokeWidth={2.5} />,
  },
  decline: {
    title: "Gracefully noted.",
    message: "We're sorry you can't make it,\nbut we appreciate you letting us know.",
    icon: <X size={36} color="white" strokeWidth={2.5} />,
  },
}

export default function ConfirmOverlay({ type, onClose }: ConfirmOverlayProps) {
  const { title, message, icon } = CONFIRM_CONTENT[type]
  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center px-8 text-center animate-[fadeIn_0.25s_ease_forwards]"
      style={{ backgroundColor: "rgba(245,244,236,0.96)" }}
      onClick={onClose}
    >
      <div
        className="w-[72px] h-[72px] rounded-full flex items-center justify-center mb-5"
        style={{ backgroundColor: "rgba(195,194,160,1)" }}
      >
        {icon}
      </div>
      <h2
        className="text-[30px] text-[#3a3a2e] mb-3"
        style={{ fontFamily: "var(--font-slight)" }}
      >
        {title}
      </h2>
      <p
        className="text-[15px] leading-[1.65] text-[#5a5a48] whitespace-pre-line"
        style={{ fontFamily: "var(--font-belleza)" }}
      >
        {message}
      </p>
      <p
        className="mt-8 text-[13px] text-[#8a8a78]"
        style={{ fontFamily: "var(--font-belleza)" }}
      >
        Tap anywhere to close
      </p>
    </div>
  )
}
