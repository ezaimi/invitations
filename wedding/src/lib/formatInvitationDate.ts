const monthNumbers: Record<string, string> = {
  january: "01",
  february: "02",
  march: "03",
  april: "04",
  may: "05",
  june: "06",
  july: "07",
  august: "08",
  september: "09",
  october: "10",
  november: "11",
  december: "12",
};

export function formatInvitationDate(value: string) {
  const trimmed = value.trim();
  const namedMatch = trimmed.match(/^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$/);

  if (namedMatch) {
    const [, day, monthName, year] = namedMatch;
    const month = monthNumbers[monthName.toLowerCase()];

    if (month) {
      return `${day.padStart(2, "0")}-${month}-${year}`;
    }
  }

  const isoMatch = trimmed.match(/^(\d{4})-(\d{2})-(\d{2})/);

  if (isoMatch) {
    const [, year, month, day] = isoMatch;
    return `${day}-${month}-${year}`;
  }

  return trimmed;
}
