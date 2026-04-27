import type {
  Invitation,
  PartialV1TemplateData,
  V1TemplateData,
} from "./types/Invitation"

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

function toIsoDate(value: string) {
  const namedMatch = value.match(/^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$/)

  if (namedMatch) {
    const [, day, monthName, year] = namedMatch
    const monthIndex = monthNames.findIndex(
      (month) => month.toLowerCase() === monthName.toLowerCase()
    )

    if (monthIndex >= 0) {
      return `${year}-${String(monthIndex + 1).padStart(2, "0")}-${day.padStart(2, "0")}`
    }
  }

  const isoMatch = value.match(/^(\d{4})-(\d{2})-(\d{2})/)

  if (isoMatch) {
    const [, year, month, day] = isoMatch
    return `${year}-${month}-${day}`
  }

  return null
}

function toDateParts(isoDate: string): [string, string, string] {
  const [, year, month, day] = isoDate.match(/^(\d{4})-(\d{2})-(\d{2})$/) ?? []

  if (!year || !month || !day) {
    return ["22", "07", "26"]
  }

  return [day, month, year.slice(-2)]
}

function toDateText(isoDate: string) {
  const [day, month, year] = toDateParts(isoDate)
  return `${day}.${month}.20${year}`
}

export function buildDefaultV1TemplateData({
  bride,
  groom,
  date,
}: Pick<Invitation, "bride" | "groom" | "date">): V1TemplateData {
  const isoDate = toIsoDate(date) ?? "2026-07-22"

  return {
    home: {
      brideName: bride,
      groomName: groom,
      dateText: toDateText(isoDate),
      videoSrc: "/videos/v1/couple.mp4",
    },
    details: {
      date: {
        iso: isoDate,
        parts: toDateParts(isoDate),
      },
      mapImageSrc: "/images/templates/v1/map.png",
      dressCodeColors: ["#b7b37a", "#9fb6cf", "#cfa3a1", "#d9c38f", "#d9d69b"],
    },
    schedule: {
      items: [
        {
          time: "17:30",
          title: "GUEST ARRIVAL",
          description:
            "Please arrive, find your seats, and settle in as we prepare to begin the ceremony.",
        },
        {
          time: "18:00",
          title: "CEREMONY",
          description:
            "Join us as we exchange our vows and celebrate the start of our life together.",
        },
        {
          time: "19:00",
          title: "COCKTAIL HOUR",
          description:
            "Enjoy a selection of drinks and light bites while mingling with family and friends.",
        },
        {
          time: "20:00",
          title: "PARTY & DINNER",
          description:
            "Celebrate with us on the dance floor as we enjoy music, laughter, and the evening together.",
        },
      ],
    },
    rsvp: {
      birdAnimationSrc: "/images/templates/v1/bird.gif",
    },
    countdown: {
      targetDateTime: `${isoDate}T17:30:00`,
    },
  }
}

export function resolveV1TemplateData(
  invitation: Pick<Invitation, "bride" | "groom" | "date" | "templateData">
): V1TemplateData {
  const defaults = buildDefaultV1TemplateData(invitation)
  const overrides: PartialV1TemplateData | undefined = invitation.templateData?.v1

  return {
    home: {
      ...defaults.home,
      ...overrides?.home,
    },
    details: {
      ...defaults.details,
      ...overrides?.details,
      date: {
        ...defaults.details.date,
        ...overrides?.details?.date,
        parts: overrides?.details?.date?.parts ?? defaults.details.date.parts,
      },
      dressCodeColors:
        overrides?.details?.dressCodeColors ?? defaults.details.dressCodeColors,
    },
    schedule: {
      items: overrides?.schedule?.items ?? defaults.schedule.items,
    },
    rsvp: {
      ...defaults.rsvp,
      ...overrides?.rsvp,
    },
    countdown: {
      ...defaults.countdown,
      ...overrides?.countdown,
    },
  }
}
