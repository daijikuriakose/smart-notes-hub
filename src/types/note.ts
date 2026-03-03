export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  summary: string;
  tags: string[];
  mood: { emoji: string; label: string };
  pinned: boolean;
}
