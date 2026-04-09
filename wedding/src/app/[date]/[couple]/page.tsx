import InvitationPageRenderer from "@/components/invitations/InvitationPageRenderer";
import { buildInvitationFromRoute } from "@/lib/invitation-routing";
import { notFound } from "next/navigation";

type InvitationRoutePageProps = {
  params: Promise<{
    date: string;
    couple: string;
  }>;
  searchParams: Promise<{
    template?: string | string[];
  }>;
};

export default async function InvitationRoutePage({
  params,
  searchParams,
}: InvitationRoutePageProps) {
  const [{ date, couple }, { template }] = await Promise.all([
    params,
    searchParams,
  ]);

  const invitation = buildInvitationFromRoute({
    dateSlug: date,
    coupleSlug: couple,
    templateSlug: template,
  });

  if (!invitation) {
    notFound();
  }

  return <InvitationPageRenderer invitation={invitation} />;
}
