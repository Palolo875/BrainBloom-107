import { writable, get } from 'svelte/store';

export interface Note {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  tags: string[];
  connections: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Create stores for notes state management
export const notes = writable<Note[]>([]);
export const searchQuery = writable<string>('');
export const currentView = writable<'home' | 'notes' | 'editor' | 'graph' | 'modules' | 'settings' | 'tasks' | 'journal' | 'learning'>('home');
export const currentNoteId = writable<string | null>(null);

// Helper functions to manage notes (replacing React hooks logic)
export const notesActions = {
  createNote: (title: string = 'New Note'): Note => {
    const newNote: Note = {
      id: Date.now().toString(),
      title,
      content: '',
      excerpt: '',
      tags: [],
      connections: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    notes.update(currentNotes => [...currentNotes, newNote]);
    return newNote;
  },

  updateNote: (id: string, updates: Partial<Note>) => {
    notes.update(currentNotes => 
      currentNotes.map(note => 
        note.id === id 
          ? { ...note, ...updates, updatedAt: new Date() }
          : note
      )
    );
  },

  getNoteById: (id: string): Note | undefined => {
    return get(notes).find(note => note.id === id);
  }
};