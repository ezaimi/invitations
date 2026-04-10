import { Invitation } from "../v1/types/Invitation";
import InvitationLayout from "../v1/components/InvitationLayout";
import Intro from "./components/Intro";
import Celebration from "./components/Celebration";


export default function GeneralInvitationV2({ data }: { data: Invitation }) {
  return (
    <InvitationLayout>
      <Intro data={data} />
      <Celebration/>
      <div className="h-screen"></div>
    </InvitationLayout>
  )
}
