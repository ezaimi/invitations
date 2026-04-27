export interface V1InvitationDate {
  iso: string
  parts: [string, string, string]
}

export interface V1HomeData {
  brideName: string
  groomName: string
  dateText: string
  videoSrc: string
}

export interface V1DetailsData {
  date: V1InvitationDate
  mapImageSrc: string
  dressCodeColors: string[]
}

export interface V1ScheduleItem {
  time: string
  title: string
  description: string
}

export interface V1ScheduleData {
  items: V1ScheduleItem[]
}

export interface V1RSVPData {
  birdAnimationSrc: string
}

export interface V1CountdownData {
  targetDateTime: string
}

export interface V1TemplateData {
  home: V1HomeData
  details: V1DetailsData
  schedule: V1ScheduleData
  rsvp: V1RSVPData
  countdown: V1CountdownData
}

export interface PartialV1TemplateData {
  home?: Partial<V1HomeData>
  details?: {
    date?: Partial<V1InvitationDate>
    mapImageSrc?: string
    dressCodeColors?: string[]
  }
  schedule?: {
    items?: V1ScheduleItem[]
  }
  rsvp?: Partial<V1RSVPData>
  countdown?: Partial<V1CountdownData>
}

export interface Invitation {
  bride: string
  groom: string
  date: string
  templateData?: {
    v1?: PartialV1TemplateData
  }
}
