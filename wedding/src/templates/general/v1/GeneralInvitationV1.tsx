import Home from "./components/Home";
import { Invitation } from "./types/Invitation";
import { resolveV1TemplateData } from "./defaultTemplateData";
import InvitationLayout from "./components/InvitationLayout";
import DeferredSections from "./components/DeferredSections";


export default function GeneralInvitationV1({ data }: { data: Invitation }) {
  const templateData = resolveV1TemplateData(data)

  return (
    <InvitationLayout>
      <div className="relative">
        <Home data={templateData.home}/>
      </div>
      <DeferredSections
        countdown={templateData.countdown}
        details={templateData.details}
        rsvp={templateData.rsvp}
        scheduleItems={templateData.schedule.items}
      />
    </InvitationLayout>
  )
}
