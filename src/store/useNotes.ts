import { create } from "zustand";
import { INoteStore } from "./noted";

export const useNotesStore = create<INoteStore>((set, get) => ({
  notes: [],

  addNote: (note) => {
    set((state) => ({
      notes: [...state.notes, note],
    }));
  },

  editNote: (id, editedNote) => {
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === id ? { ...note, ...editedNote } : note,
      ),
    }));
  },

  deleteNote: (id: string) => {
    set((state) => ({
      notes: state.notes.filter((note) => note.id !== id),
    }));
  },

  markCompleted: (id: string) => {
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === id ? { ...note, isCompleted: true } : note,
      ),
    }));
  },
}));

export default useNotesStore;
