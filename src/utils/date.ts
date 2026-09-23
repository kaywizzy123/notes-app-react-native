export function formatDate(date: Date) {
  return date.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export type DueStatus = "overdue" | "today" | "upcoming";

export function getDueStatus(dueDate: number): DueStatus {
  const startOfDay = (timestamp: number) => {
    const d = new Date(timestamp);
    d.setHours(0, 0, 0, 0);
    return d.getTime();
  };

  const due = startOfDay(dueDate);
  const today = startOfDay(Date.now());

  if (due < today) return "overdue";
  if (due === today) return "today";
  return "upcoming";
}
