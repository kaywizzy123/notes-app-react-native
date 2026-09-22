import { INote } from "@/types/app.types";

type INoteStore = {
  notes: INote[];
  addNote: (note: INote) => void;
  editNote: (id: string, note: Partial<Omit<INote, "id">>) => void;
  deleteNote: (id: string) => void;
  toggleCompleted: (id: string) => void;
};

export { INoteStore };
