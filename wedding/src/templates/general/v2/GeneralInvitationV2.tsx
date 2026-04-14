import { Invitation } from "../v1/types/Invitation";
import InvitationLayout from "../v1/components/InvitationLayout";
import Intro from "./components/Intro";
import Celebration from "./components/Celebration";
import PlateDetails from "./components/PlateDetails";
import Venue from "./components/Venue";
import Schedule from "./components/Schedule";
import RSVP from "./components/RSVP";
import EndSection from "./components/End";
import Story from "./components/OurStory";


export default function GeneralInvitationV2({ data }: { data: Invitation }) {
  return (
    <InvitationLayout>
      <Intro data={data} />
      <Celebration/>
      <PlateDetails/>
      <Venue/>
      <Schedule/>
      <Story/>
      <RSVP/>
      <EndSection/>
    </InvitationLayout>
  )
}
