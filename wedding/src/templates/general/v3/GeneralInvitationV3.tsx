import Schedule from "./components/Schedule"
import InvitationLayout from "./components/InvitationLayout"
import RSVP from "./components/RSVP"

import Salute from "./components/Salute"
import Map from "./components/Map"
import End from "./components/End"
import Song from "./components/Song"
import Home from "./components/Home"
function GeneralInvitationV3() {
  return (
    <InvitationLayout>
      <Home />
      <Salute />
      <br />
      <Map />
      <br />
      <br />
      <Schedule />
      <RSVP />

      <div className="relative z-10">
        <Song />
      </div>

      <div className="relative z-0">
        <End />
      </div>
    </InvitationLayout>
  )
}

export default GeneralInvitationV3

