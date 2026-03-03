import { Plus, Download, StickyNote } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SearchBar } from "./SearchBar";
import { ThemeToggle } from "./ThemeToggle";
import { SortOrder } from "@/hooks/useNotes";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  sortOrder: SortOrder;
  onSortChange: (value: SortOrder) => void;
  onNewNote: () => void;
  onDownload: (format: "txt" | "json") => void;
}

export function Header({
  searchQuery,
  onSearchChange,
  sortOrder,
  onSortChange,
  onNewNote,
  onDownload,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <StickyNote className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold tracking-tight">Smart Notes</h1>
          </div>

          <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
            <SearchBar value={searchQuery} onChange={onSearchChange} />

            <div className="flex items-center gap-2">
              <Select value={sortOrder} onValueChange={(v) => onSortChange(v as SortOrder)}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest first</SelectItem>
                  <SelectItem value="oldest">Oldest first</SelectItem>
                </SelectContent>
              </Select>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" title="Download notes">
                    <Download className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onDownload("txt")}>
                    Download as .txt
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onDownload("json")}>
                    Download as .json
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <ThemeToggle />

              <Button onClick={onNewNote} className="gap-2">
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">New Note</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
