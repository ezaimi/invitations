export function withAlpha(color: string, percentage: number) {
  return `color-mix(in srgb, ${color} ${percentage}%, transparent)`
}
