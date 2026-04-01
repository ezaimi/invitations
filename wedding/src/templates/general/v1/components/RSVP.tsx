"use client";

import { useState } from "react";

// ─── Icons ────────────────────────────────────────────────────────────────────

function PersonIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-[22px] h-[22px] fill-white">
      <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
    </svg>
  );
}

function AtIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-[22px] h-[22px] fill-white">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10h5v-2h-5c-4.34 0-8-3.66-8-8s3.66-8 8-8 8 3.66 8 8v1.43c0 .79-.71 1.57-1.5 1.57S17 14.22 17 13.43V12c0-2.76-2.24-5-5-5s-5 2.24-5 5 2.24 5 5 5c1.38 0 2.64-.56 3.54-1.47.65.89 1.77 1.47 2.96 1.47 1.97 0 3.5-1.6 3.5-3.57V12c0-5.52-4.48-10-10-10zm0 13c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-9 h-9" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-9 h-9" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: React.ReactNode;
}

function InputField({ icon, ...inputProps }: InputFieldProps) {
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
        {...inputProps}
        className="flex-1 bg-transparent border-none outline-none text-base text-[#3a3a2e] placeholder-[#5a5a48] caret-[#3a3a2e] py-4 pr-5 pl-3"
        style={{ fontFamily: "var(--font-belleza)" }}
      />
    </div>
  );
}

interface GuestCounterProps {
  count: number;
  onChange: (val: number) => void;
}

function GuestCounter({ count, onChange }: GuestCounterProps) {
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
  );
}

interface ConfirmOverlayProps {
  type: "accept" | "decline";
  onClose: () => void;
}

const CONFIRM_CONTENT = {
  accept: {
    title: "Joyfully accepted!",
    message: "We're so happy you'll be joining us.\nWe look forward to celebrating with you!",
    icon: <CheckIcon />,
  },
  decline: {
    title: "Gracefully noted.",
    message: "We're sorry you can't make it,\nbut we appreciate you letting us know.",
    icon: <CloseIcon />,
  },
};

function ConfirmOverlay({ type, onClose }: ConfirmOverlayProps) {
  const { title, message, icon } = CONFIRM_CONTENT[type];
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
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function RSVPPage() {
  const [guestCount, setGuestCount] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [wishes, setWishes] = useState("");
  const [overlay, setOverlay] = useState<"accept" | "decline" | null>(null);

  return (
    <>
          <main className="w-full  min-h-screen px-7 py-12 flex flex-col ">

        {/* ── Header ── */}
        <header className="text-center mb-7 opacity-0 animate-[slideUp_0.5s_ease_0.05s_forwards]">
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="flex-1 max-w-[42px] h-px bg-[#3a3a2e]" />
            <h1
              className="text-[28px] leading-none whitespace-nowrap text-[#3a3a2e]"
              style={{ fontFamily: "var(--font-slight)" }}
            >
              Will you join us?
            </h1>
            <span className="flex-1 max-w-[42px] h-px bg-[#3a3a2e]" />
          </div>
          <p
            className="text-[15.5px] leading-[1.65] text-[#3a3a2e] px-1"
            style={{ fontFamily: "var(--font-belleza)" }}
          >
            Please be so kind as to confirm your attendance by submitting your
            RSVP no later than April&nbsp;1st, so that we can make the necessary
            arrangements and plan accordingly for all our guests.
          </p>
        </header>

        {/* ── Full Name ── */}
        <div className="opacity-0 animate-[slideUp_0.5s_ease_0.12s_forwards]">
          <InputField
            icon={<PersonIcon />}
            type="text"
            placeholder="Full Name"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* ── Email ── */}
        <div className="mt-4 opacity-0 animate-[slideUp_0.5s_ease_0.19s_forwards]">
          <InputField
            icon={<AtIcon />}
            type="email"
            placeholder="e-mail address"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* ── Guest Counter ── */}
        <div className="mt-5 opacity-0 animate-[slideUp_0.5s_ease_0.26s_forwards]">
          <GuestCounter count={guestCount} onChange={setGuestCount} />
        </div>

        {/* ── Wishes ── */}
        <div
          className="mt-5 rounded-[20px] px-5 py-5 opacity-0 animate-[slideUp_0.5s_ease_0.33s_forwards]"
          style={{ backgroundColor: "rgba(195,194,160,0.39)" }}
        >
          <textarea
            rows={6}
            placeholder="Share your wishes..."
            value={wishes}
            onChange={(e) => setWishes(e.target.value)}
            className="w-full bg-transparent border-none outline-none resize-none text-[15.5px] leading-[1.6] text-[#3a3a2e] placeholder-[#5a5a48] caret-[#3a3a2e] focus:ring-0"
            style={{ fontFamily: "var(--font-belleza)" }}
          />
        </div>

        {/* ── Buttons ── */}
        <div className="mt-7 flex gap-3.5 opacity-0 animate-[slideUp_0.5s_ease_0.40s_forwards]">
          <button
            onClick={() => setOverlay("accept")}
            className="flex-1 py-[18px] rounded-full text-white text-[15px] tracking-wide transition-all duration-150 active:scale-[0.97] active:opacity-90"
            style={{ backgroundColor: "rgba(195,194,160,1)", fontFamily: "var(--font-belleza)" }}
          >
            Joyfylly Accept
          </button>
          <button
            onClick={() => setOverlay("decline")}
            className="flex-1 py-[18px] rounded-full text-white text-[15px] tracking-wide transition-all duration-150 active:scale-[0.97] active:opacity-90"
            style={{ backgroundColor: "rgba(195,194,160,1)", fontFamily: "var(--font-belleza)" }}
          >
            Gracefully Decline
          </button>
        </div>

      </main>

      {/* ── Confirmation overlay ── */}
      {overlay && (
        <ConfirmOverlay type={overlay} onClose={() => setOverlay(null)} />
      )}
    </>
  );
}
