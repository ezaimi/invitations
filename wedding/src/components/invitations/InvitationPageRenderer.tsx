import GeneralInvitationV1 from "@/templates/general/v1/GeneralInvitationV1";
import GeneralInvitationV2 from "@/templates/general/v2/GeneralInvitationV2";
import GeneralInvitationV3 from "@/templates/general/v3/GeneralInvitationV3";
import type { RoutedInvitation } from "@/lib/invitation-routing";

const templates = {
  v1: GeneralInvitationV1,
  v2: GeneralInvitationV2,
  v3: GeneralInvitationV3
};

export default function InvitationPageRenderer({
  invitation,
}: {
  invitation: RoutedInvitation;
}) {
  const Component = templates[invitation.template];
  return <Component data={invitation} />;
}
