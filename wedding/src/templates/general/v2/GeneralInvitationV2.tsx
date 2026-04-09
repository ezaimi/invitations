import { Invitation } from "../v1/types/Invitation";
import InvitationLayout from "../v1/components/InvitationLayout";
import Intro from "./components/Intro";


export default function GeneralInvitationV2({ data }: { data: Invitation }) {
  return (
    <InvitationLayout>
      <Intro data={data} />
    </InvitationLayout>
  )
}
