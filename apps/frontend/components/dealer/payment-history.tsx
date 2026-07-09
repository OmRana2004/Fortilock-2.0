"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function PaymentHistory() {
  return (
    <div className="mt-6 rounded-xl border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>EMI</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Mode</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow>
            <TableCell>09 Jul 2026</TableCell>
            <TableCell>#1</TableCell>
            <TableCell>₹1,866</TableCell>
            <TableCell>Cash</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}