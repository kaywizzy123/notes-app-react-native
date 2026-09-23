export type INote = {
  id: string;
  title: string;
  description: string;
  dueDate: number;
  /** Creation time, set once on add and never user-editable. */
  timestamp: number;
  category: string;
  isCompleted: boolean;
};
