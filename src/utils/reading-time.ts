export function calculateReadingTime(content: string): number {
  const WORDS_PER_MINUTE = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / WORDS_PER_MINUTE);
  return Math.max(1, minutes);
}
