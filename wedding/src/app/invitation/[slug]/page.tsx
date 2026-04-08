import GeneralInvitationV1 from "@/templates/general/v1/GeneralInvitationV1"
import GeneralInvitationV2 from "@/templates/general/v2/GeneralInvitationV2"
export default function Page() {
  const data = {
    bride: "Anna",
    groom: "Marco",
    date: "12 July 2027"
  }

  return <GeneralInvitationV2 data={data} />
}