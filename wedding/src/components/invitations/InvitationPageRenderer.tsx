import GeneralInvitationV1 from "@/templates/general/v1/GeneralInvitationV1";
import GeneralInvitationV2 from "@/templates/general/v2/GeneralInvitationV2";
import type { RoutedInvitation } from "@/lib/invitation-routing";

const templates = {
  v1: GeneralInvitationV1,
  v2: GeneralInvitationV2,
};

export default function InvitationPageRenderer({
  invitation,
}: {
  invitation: RoutedInvitation;
}) {
  const Component = templates[invitation.template];
  return <Component data={invitation} />;
}
