/**
 * Lightweight class-name merger — joins truthy strings, filters falsy values.
 * Drop-in replacement for clsx when clsx is not installed.
 */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
