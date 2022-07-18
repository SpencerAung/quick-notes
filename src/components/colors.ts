
export const BORDER_COLORS = ['red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose',];
export const BORDER_COLOR_RANGES = [500, 600, 700, 800, 900];
export function getRandomInt(max: number): number {
  return Math.floor(Math.random() * max);
}
export function getBorderColorClassName() {
  const color = getRandomInt(BORDER_COLORS.length);
  const range = getRandomInt(BORDER_COLOR_RANGES.length);

  return `border-${BORDER_COLORS[color]}-${BORDER_COLOR_RANGES[range]}`;
}
