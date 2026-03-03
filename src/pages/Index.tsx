import { useState } from "react";
import { StickyNote } from "lucide-react";
import { Header } from "@/components/Header";
import { NoteCard } from "@/components/NoteCard";
import { NoteForm } from "@/components/NoteForm";
import { useNotes } from "@/hooks/useNotes";
import { Note } from "@/types/note";

const Index = () => {
  const {
    notes,
    searchQuery,
    setSearchQuery,
    sortOrder,
    setSortOrder,
    addNote,
    updateNote,
    deleteNote,
    togglePin,
    downloadNotes,
  } = useNotes();

  const [formOpen, setFormOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  const handleNew = () => {
    setEditingNote(null);
    setFormOpen(true);
  };

  const handleEdit = (note: Note) => {
    setEditingNote(note);
    setFormOpen(true);
  };

  const handleSave = (title: string, content: string) => {
    if (editingNote) {
      updateNote(editingNote.id, title, content);
    } else {
      addNote(title, content);
    }
    setEditingNote(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortOrder={sortOrder}
        onSortChange={setSortOrder}
        onNewNote={handleNew}
        onDownload={downloadNotes}
      />

      <main className="container mx-auto px-4 py-8">
        {notes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <StickyNote className="h-16 w-16 text-muted-foreground/40 mb-4" />
            <h2 className="text-xl font-semibold text-muted-foreground">
              {searchQuery ? "No notes found" : "No notes yet"}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {searchQuery ? "Try a different search term" : "Click \"New Note\" to get started"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {notes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                searchQuery={searchQuery}
                onEdit={handleEdit}
                onDelete={deleteNote}
                onTogglePin={togglePin}
              />
            ))}
          </div>
        )}
      </main>

      <NoteForm
        open={formOpen}
        onOpenChange={setFormOpen}
        onSave={handleSave}
        editingNote={editingNote}
      />
    </div>
  );
};

export default Index;
