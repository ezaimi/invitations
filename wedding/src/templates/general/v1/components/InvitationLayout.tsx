import type { ReactNode } from "react";

export default function InvitationLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-[#fffdf6] text-[#3a3a2e]">
      {children}
    </main>
  );
}
