

# Smart Notes App

A clean, modern notes application with smart features, built with React + TypeScript + Tailwind CSS.

## Pages & Layout

- **Single-page app** with a header containing the app title, search bar, theme toggle (light/dark), and action buttons
- Responsive grid layout: 1 column on mobile, 2-3 columns on desktop

## Core Features

### Notes Management
- **Create/Edit/Delete notes** via a modal form (title, content, tags)
- **localStorage persistence** — notes survive page refresh
- Each note auto-generates: a short summary, keyword-based tags, and a mood emoji using simple utility functions

### Note Cards
- Beautiful card layout showing: title, content preview (with markdown rendering), date, auto-summary, tags as badges, mood indicator, and a pin icon
- Subtle hover effects and smooth transitions

### Search
- Live search bar that filters notes as you type (case-insensitive)
- Highlights matching text within note titles and content

### Sorting & Pinning
- Sort dropdown: Newest first / Oldest first
- Pin/unpin notes — pinned notes always appear at the top

### Smart Features (Mock AI)
- **Summary generator**: extracts first ~20 words
- **Tag generator**: identifies common keywords from content
- **Mood detector**: keyword mapping (happy → 😊, sad → 😢, urgent → 🚨, etc.)

### Extra Features
- **Markdown support**: bold, italic, headings rendered in cards
- **Download notes** as `.txt` or `.json` file

## Design
- Warm white background in light mode, dark tones in dark mode
- Theme toggle using `next-themes`
- Elegant shadcn/ui cards, buttons, dialogs, and badges
- Smooth animations via tailwindcss-animate

