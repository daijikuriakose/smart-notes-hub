const MOOD_MAP: { keywords: string[]; emoji: string; label: string }[] = [
  { keywords: ["urgent", "asap", "deadline", "emergency", "critical", "immediately"], emoji: "🚨", label: "Urgent" },
  { keywords: ["happy", "joy", "excited", "great", "wonderful", "amazing", "love", "celebrate", "awesome"], emoji: "😊", label: "Happy" },
  { keywords: ["sad", "sorry", "unfortunately", "disappointed", "regret", "miss", "lonely"], emoji: "😢", label: "Sad" },
  { keywords: ["angry", "frustrated", "annoyed", "furious", "rage", "hate"], emoji: "😠", label: "Angry" },
  { keywords: ["idea", "creative", "brainstorm", "inspiration", "innovate", "imagine"], emoji: "💡", label: "Idea" },
  { keywords: ["todo", "task", "remember", "checklist", "plan", "schedule", "meeting"], emoji: "📋", label: "Task" },
  { keywords: ["question", "wonder", "confused", "unclear", "doubt", "curious"], emoji: "🤔", label: "Thinking" },
  { keywords: ["study", "learn", "research", "read", "book", "course", "lecture"], emoji: "📚", label: "Study" },
];

export function detectMood(content: string): { emoji: string; label: string } {
  const lower = content.toLowerCase();
  let bestMatch = { emoji: "📝", label: "Note" };
  let bestCount = 0;

  for (const mood of MOOD_MAP) {
    const count = mood.keywords.filter((kw) => lower.includes(kw)).length;
    if (count > bestCount) {
      bestCount = count;
      bestMatch = { emoji: mood.emoji, label: mood.label };
    }
  }

  return bestMatch;
}
