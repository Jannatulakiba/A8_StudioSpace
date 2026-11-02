import type { BookingStatus } from "@/lib/types";

const styles: Record<BookingStatus, string> = {
  Pending: "bg-amber-100 text-amber-900 dark:bg-amber-500/20 dark:text-amber-200",
  Confirmed: "bg-emerald-100 text-emerald-900 dark:bg-emerald-500/20 dark:text-emerald-200",
  Completed: "bg-blue-100 text-blue-900 dark:bg-blue-500/20 dark:text-blue-200",
  Cancelled: "bg-red-100 text-red-900 dark:bg-red-500/20 dark:text-red-200",
};

export default function StatusBadge({ status }: { status: BookingStatus }) {
  return <span className={`rounded-full px-3 py-0.5 text-xs font-semibold ${styles[status]}`}>{status}</span>;
}
