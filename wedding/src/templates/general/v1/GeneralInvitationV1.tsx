import Home from "./components/Home";
import { Invitation } from "./types/Invitation";
import Schedule from "./components/Schedule";
import RSVP from "./components/RSVP";
import InvitationLayout from "./components/InvitationLayout";
import Details from "./components/Details";
export default function GeneralInvitationV1({ data }: { data: Invitation }) {
  return (
    <InvitationLayout>
      <div className="h-[120vh]">1</div>
      <Home data={data}/>
      <div className="h-[10vh] "></div>
      <Details />
      <Schedule />
      <RSVP />
    </InvitationLayout>
  )
}
