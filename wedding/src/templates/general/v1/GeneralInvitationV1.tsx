import Home from "./components/Home";
import { Invitation } from "./types/Invitation";
import { resolveV1TemplateData } from "./defaultTemplateData";
import Schedule from "./components/Schedule";
import RSVP from "./components/RSVP";
import InvitationLayout from "./components/InvitationLayout";
import Details from "./components/Details/Details";
import Countdown from "./components/Countdown";


export default function GeneralInvitationV1({ data }: { data: Invitation }) {
  const templateData = resolveV1TemplateData(data)

  return (
    <InvitationLayout>
      <div className="relative">
        <Home data={templateData.home}/>
      </div>
      <Details data={templateData.details} />
      <Schedule items={templateData.schedule.items} />

      <RSVP data={templateData.rsvp} />
      <br />
      <br />
      <Countdown data={templateData.countdown}/>
    </InvitationLayout>
  )
}
