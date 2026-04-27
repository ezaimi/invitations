import type { ReactNode } from "react";

export default function InvitationLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main className="bg-[#f5f0e4] min-h-screen w-full max-w-142">
      {children}
    </main>
  );
}
