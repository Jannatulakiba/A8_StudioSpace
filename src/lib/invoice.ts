import { jsPDF } from "jspdf";
import type { Booking } from "@/lib/types";

const BRAND: [number, number, number] = [230, 57, 70]; // #e63946
const INK: [number, number, number] = [14, 26, 43];
const MUTED: [number, number, number] = [91, 103, 121];

export function downloadInvoice(b: Booking) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const W = doc.internal.pageSize.getWidth();
  const M = 56; // margin

  /* header band */
  doc.setFillColor(...BRAND);
  doc.rect(0, 0, W, 86, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("StudioSpace", M, 42);
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text("Booking invoice", M, 62);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text(`INV-${b._id.slice(-8).toUpperCase()}`, W - M, 46, { align: "right" });

  /* bill rows */
  let y = 140;
  const row = (label: string, value: string, bold = false) => {
    doc.setTextColor(...MUTED);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text(label, M, y);
    doc.setTextColor(...INK);
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(bold ? 13 : 11);
    doc.text(value, W - M, y, { align: "right" });
    y += bold ? 28 : 22;
  };

  doc.setTextColor(...INK);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.text(b.studioTitle, M, y);
  y += 34;

  row("Billed to", b.userEmail);
  row("Hosted space", b.studioTitle);
  row("Shoot date", b.date);
  row("Slot", `${b.startHour}:00 – ${b.endHour}:00 (${b.endHour - b.startHour} hr)`);
  row("Booking status", b.status);

  /* total */
  y += 12;
  doc.setDrawColor(...BRAND);
  doc.setLineWidth(1.2);
  doc.line(M, y, W - M, y);
  y += 30;
  row("TOTAL DUE", `$${b.total}`, true);
  y += 4;
  doc.setTextColor(...MUTED);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  const hours = b.endHour - b.startHour;
  if (hours > 0) doc.text(`Rate basis: $${(b.total / hours).toFixed(2)} x ${hours} hr`, M, y);

  /* footer */
  doc.setFontSize(9.5);
  doc.text(
    "Thank you for booking with StudioSpace. Keep this receipt for your records.",
    M,
    doc.internal.pageSize.getHeight() - 46,
  );
  doc.text(`Booked on ${new Date(b.createdAt).toLocaleString()}`, M, doc.internal.pageSize.getHeight() - 30);

  doc.save(`StudioSpace-Invoice-${b._id.slice(-8)}.pdf`);
}
