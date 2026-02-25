/**
 * Beautifies App Store description text for display.
 * Preserves original formatting; does not parse structure.
 *
 * App Store descriptions vary widely (•, ·, -, ■, ▶, ALL CAPS headers, etc.).
 * We render as-is with preserved line breaks rather than assuming a format.
 */
export function beautifyDescription(description: string): string {
  return description.trim();
}
