import GeneralInvitationV1 from "@/templates/general/v1/GeneralInvitationV1"

export default function Page() {
  const data = {
    bride: "Anna",
    groom: "Marco",
    date: "12 July 2027"
  }

  return <GeneralInvitationV1 data={data} />
}