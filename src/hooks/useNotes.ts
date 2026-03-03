import { useState, useEffect, useMemo } from "react";
import { Note } from "@/types/note";
import { generateSummary } from "@/utils/summaryGenerator";
import { generateTags } from "@/utils/tagGenerator";
import { detectMood } from "@/utils/moodDetector";

const STORAGE_KEY = "smart-notes";

function loadNotes(): Note[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export type SortOrder = "newest" | "oldest";

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>(loadNotes);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  const addNote = (title: string, content: string) => {
    const note: Note = {
      id: crypto.randomUUID(),
      title,
      content,
      createdAt: new Date().toISOString(),
      summary: generateSummary(content),
      tags: generateTags(content),
      mood: detectMood(content),
      pinned: false,
    };
    setNotes((prev) => [note, ...prev]);
  };

  const updateNote = (id: string, title: string, content: string) => {
    setNotes((prev) =>
      prev.map((n) =>
        n.id === id
          ? {
              ...n,
              title,
              content,
              summary: generateSummary(content),
              tags: generateTags(content),
              mood: detectMood(content),
            }
          : n
      )
    );
  };

  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  const togglePin = (id: string) => {
    setNotes((prev) => prev.map((n) => (n.id === id ? { ...n, pinned: !n.pinned } : n)));
  };

  const filteredAndSorted = useMemo(() => {
    let result = notes;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (n) => n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q)
      );
    }

    result = [...result].sort((a, b) => {
      if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [notes, searchQuery, sortOrder]);

  const downloadNotes = (format: "txt" | "json") => {
    let content: string;
    let filename: string;
    let type: string;

    if (format === "json") {
      content = JSON.stringify(notes, null, 2);
      filename = "notes.json";
      type = "application/json";
    } else {
      content = notes
        .map((n) => `# ${n.title}\nDate: ${new Date(n.createdAt).toLocaleDateString()}\nMood: ${n.mood.emoji} ${n.mood.label}\nTags: ${n.tags.join(", ")}\n\n${n.content}\n\n---`)
        .join("\n\n");
      filename = "notes.txt";
      type = "text/plain";
    }

    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return {
    notes: filteredAndSorted,
    searchQuery,
    setSearchQuery,
    sortOrder,
    setSortOrder,
    addNote,
    updateNote,
    deleteNote,
    togglePin,
    downloadNotes,
  };
}
