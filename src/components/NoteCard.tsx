import { Pin, PinOff, Pencil, Trash2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Note } from "@/types/note";
import { HighlightText } from "./HighlightText";

interface NoteCardProps {
  note: Note;
  searchQuery: string;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
  onTogglePin: (id: string) => void;
}

export function NoteCard({ note, searchQuery, onEdit, onDelete, onTogglePin }: NoteCardProps) {
  const date = new Date(note.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Card className="group relative transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
      {note.pinned && (
        <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs z-10">
          📌
        </div>
      )}

      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg leading-snug">
            <HighlightText text={note.title} query={searchQuery} />
          </CardTitle>
          <span className="text-2xl shrink-0" title={note.mood.label}>
            {note.mood.emoji}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">{date}</p>
      </CardHeader>

      <CardContent className="pb-3 space-y-2">
        <div className="prose prose-sm dark:prose-invert max-h-32 overflow-hidden text-sm leading-relaxed">
          {searchQuery ? (
            <p>
              <HighlightText text={note.content.slice(0, 200)} query={searchQuery} />
              {note.content.length > 200 && "…"}
            </p>
          ) : (
            <ReactMarkdown>{note.content.slice(0, 200) + (note.content.length > 200 ? "…" : "")}</ReactMarkdown>
          )}
        </div>

        <p className="text-xs text-muted-foreground italic">{note.summary}</p>

        {note.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {note.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-[10px] px-2 py-0">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-0 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onTogglePin(note.id)} title={note.pinned ? "Unpin" : "Pin"}>
            {note.pinned ? <PinOff className="h-4 w-4" /> : <Pin className="h-4 w-4" />}
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onEdit(note)} title="Edit">
            <Pencil className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => onDelete(note.id)} title="Delete">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
