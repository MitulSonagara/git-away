import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistanceToNow } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatUpdatedAt(dateString?: string) {
  if (!dateString) return "N/A";

  const date = new Date(dateString);
  return `Updated ${formatDistanceToNow(date, { addSuffix: true })}`;
}
