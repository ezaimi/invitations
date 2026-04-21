import { Check, X } from "lucide-react"

export interface ConfirmOverlayProps {
  accentColor: string
  type: "accept" | "decline"
  acceptContent: {
    title: string
    message: string
  }
  declineContent: {
    title: string
    message: string
  }
  onClose: () => void
}

export default function ConfirmOverlay({
  accentColor,
  type,
  acceptContent,
  declineContent,
  onClose,
}: ConfirmOverlayProps) {
  const content = type === "accept" ? acceptContent : declineContent
  const icon =
    type === "accept" ? (
      <Check size={36} color="white" strokeWidth={2.5} />
    ) : (
      <X size={36} color="white" strokeWidth={2.5} />
    )

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center px-8 text-center animate-[fadeIn_0.25s_ease_forwards]"
      style={{ backgroundColor: "rgba(245,244,236,0.96)" }}
      onClick={onClose}
    >
      <div
        className="w-[72px] h-[72px] rounded-full flex items-center justify-center mb-5"
        style={{ backgroundColor: accentColor }}
      >
        {icon}
      </div>
      <h2
        className="text-[30px] text-[#3a3a2e] mb-3"
        style={{ fontFamily: "var(--font-slight)" }}
      >
        {content.title}
      </h2>
      <p
        className="text-[15px] leading-[1.65] text-[#5a5a48] whitespace-pre-line"
        style={{ fontFamily: "var(--font-belleza)" }}
      >
        {content.message}
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
