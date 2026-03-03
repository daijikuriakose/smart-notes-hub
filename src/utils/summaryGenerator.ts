export function generateSummary(content: string): string {
  if (!content.trim()) return "";
  const cleaned = content.replace(/[#*_~`>]/g, "").trim();
  const words = cleaned.split(/\s+/);
  const summary = words.slice(0, 20).join(" ");
  return words.length > 20 ? summary + "…" : summary;
}
