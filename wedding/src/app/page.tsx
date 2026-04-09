import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f3ea] px-6 py-16 text-[#3f4327]">
      <div className="mx-auto flex max-w-3xl flex-col gap-8 rounded-[32px] border border-[#d9d2c2] bg-white/80 p-8 shadow-sm">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.35em] text-[#8b8368]">
            Wedding Invitations
          </p>
          <h1 className="text-4xl font-semibold">Dynamic invitation routes</h1>
          <p className="max-w-2xl text-lg text-[#69644f]">
            Open an invitation with a date slug and two names in the URL.
            Use a separator between the names so the route can parse them
            correctly.
          </p>
        </div>

        <div className="space-y-3 rounded-3xl bg-[#f3efe5] p-6">
          <p className="font-medium">Examples</p>
          <Link
            className="block underline underline-offset-4"
            href="/211026/anna-marco"
          >
            /211026/anna-marco
          </Link>
          <Link
            className="block underline underline-offset-4"
            href="/211026/anna-marco?template=v1"
          >
            /211026/anna-marco?template=v1
          </Link>
          <Link
            className="block underline underline-offset-4"
            href="/invitation/211026/anna-marco"
          >
            /invitation/211026/anna-marco
          </Link>
        </div>
      </div>
    </main>
  );
}
