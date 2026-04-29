import invitations from "@/data/invitations.json";
import Link from "next/link";

const monthNumbers: Record<string, string> = {
  january: "01",
  february: "02",
  march: "03",
  april: "04",
  may: "05",
  june: "06",
  july: "07",
  august: "08",
  september: "09",
  october: "10",
  november: "11",
  december: "12",
};

function dateToSlug(date: string) {
  const [day, month, year] = date.trim().split(/\s+/);
  const monthNumber = monthNumbers[month?.toLowerCase()];

  if (!day || !monthNumber || !year) {
    return null;
  }

  return `${day.padStart(2, "0")}${monthNumber}${year.slice(-2)}`;
}

const routes = invitations
  .map((invitation) => {
    const dateSlug = dateToSlug(invitation.date);

    if (!dateSlug) {
      return null;
    }

    return {
      ...invitation,
      path: `/${dateSlug}/${invitation.slug}`,
      invitationPath: `/invitation/${dateSlug}/${invitation.slug}`,
    };
  })
  .filter((route): route is NonNullable<typeof route> => Boolean(route));

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
            Open an invitation with a date slug and two names in the URL. Add a
            new invitation to the data file and it will show here automatically.
          </p>
        </div>

        <div className="space-y-4 rounded-3xl bg-[#f3efe5] p-6">
          <p className="font-medium">Invitations</p>
          <div className="space-y-5">
            {routes.map((route) => (
              <div key={route.slug} className="space-y-2">
                <div>
                  <p className="font-medium">
                    {route.bride} & {route.groom}
                  </p>
                  <p className="text-sm uppercase tracking-[0.2em] text-[#8b8368]">
                    {route.template}
                  </p>
                </div>
                <Link
                  className="block underline underline-offset-4"
                  href={route.path}
                >
                  {route.path}
                </Link>
                <Link
                  className="block underline underline-offset-4"
                  href={route.invitationPath}
                >
                  {route.invitationPath}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
