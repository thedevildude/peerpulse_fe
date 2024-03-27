import { formatDistanceToNow, format } from "date-fns";

export function getRelativeTimeOrFormattedDateTime(dateString: string): string {
  const date = new Date(dateString);
  const today = new Date();
  const isToday =
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();

  if (isToday) {
    return formatDistanceToNow(date, { addSuffix: true });
  } else {
    return format(date, "yyyy-MM-dd HH:mm:ss");
  }
}
