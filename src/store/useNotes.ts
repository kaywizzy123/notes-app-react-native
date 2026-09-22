import { create } from "zustand";
import { INoteStore } from "./noted";

const useNotesStore = create<INoteStore>((set, get) => ({
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

  toggleCompleted: (id: string) => {
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === id ? { ...note, isCompleted: !note.isCompleted } : note,
      ),
    }));
  },
}));

export default useNotesStore;
