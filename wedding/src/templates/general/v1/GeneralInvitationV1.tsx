import Home from "./components/Home";
import { Invitation } from "./types/Invitation";
import Schedule from "./components/Schedule";
import RSVP from "./components/RSVP";
import InvitationLayout from "./components/InvitationLayout";
import Details from "./components/Details/Details";
import Countdown from "./components/Countdown";


export default function GeneralInvitationV1({ data }: { data: Invitation }) {
  return (
    <InvitationLayout>
      <div className="relative">
        <Home data={data}/>
      </div>
      <div className="h-20"></div>
      <Details />
      <Schedule />

      <RSVP />
      
      <br />
      <br />
      <Countdown/>
    </InvitationLayout>
  )
}
