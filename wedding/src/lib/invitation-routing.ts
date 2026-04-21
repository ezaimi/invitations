import type { Invitation, PartialV1TemplateData } from "@/templates/general/v1/types/Invitation";
import { resolveV1TemplateData } from "@/templates/general/v1/defaultTemplateData";
import invitationsData from "@/data/invitations.json";

export type InvitationTemplate = "v1" | "v2";

export type RoutedInvitation = Invitation & {
  template: InvitationTemplate;
};

type InvitationEntry = {
  slug: string;
  bride: string;
  groom: string;
  date: string;
  template: InvitationTemplate;
  templateData?: {
    v1?: PartialV1TemplateData;
  };
};

const invitations = invitationsData as InvitationEntry[];

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
];

function toTitleCase(value: string) {
  return value
    .split(/[\s-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
}

function parseDateSlug(dateSlug: string) {
  if (!/^\d{6}$/.test(dateSlug)) {
    return null;
  }

  const day = Number.parseInt(dateSlug.slice(0, 2), 10);
  const month = Number.parseInt(dateSlug.slice(2, 4), 10);
  const year = 2000 + Number.parseInt(dateSlug.slice(4, 6), 10);

  if (day < 1 || day > 31 || month < 1 || month > 12) {
    return null;
  }

  return `${day} ${monthNames[month - 1]} ${year}`;
}

function parseCoupleSlug(coupleSlug: string) {
  const decodedSlug = decodeURIComponent(coupleSlug);
  const parts = decodedSlug.split(/(?:-and-|_and_|and|[-_])/i).filter(Boolean);

  if (parts.length !== 2) {
    return null;
  }

  return {
    bride: toTitleCase(parts[0]),
    groom: toTitleCase(parts[1]),
  };
}

function parseTemplate(templateSlug?: string | string[]) {
  const value = Array.isArray(templateSlug) ? templateSlug[0] : templateSlug;

  if (value === "v1" || value === "v2") {
    return value;
  }

  return "v2";
}

export function buildInvitationFromRoute({
  dateSlug,
  coupleSlug,
  templateSlug,
}: {
  dateSlug: string;
  coupleSlug: string;
  templateSlug?: string | string[];
}): RoutedInvitation | null {
  const saved = invitations.find((i) => i.slug === coupleSlug);
  if (saved) {
    const baseInvitation = {
      bride: saved.bride,
      groom: saved.groom,
      date: saved.date,
      templateData: saved.templateData,
    };

    return {
      bride: saved.bride,
      groom: saved.groom,
      date: saved.date,
      template: templateSlug ? parseTemplate(templateSlug) : saved.template,
      templateData: {
        v1: resolveV1TemplateData(baseInvitation),
      },
    };
  }

  const date = parseDateSlug(dateSlug);
  const couple = parseCoupleSlug(coupleSlug);

  if (!date || !couple) {
    return null;
  }

  return {
    ...couple,
    date,
    template: parseTemplate(templateSlug),
    templateData: {
      v1: resolveV1TemplateData({
        bride: couple.bride,
        groom: couple.groom,
        date,
        templateData: undefined,
      }),
    },
  };
}
