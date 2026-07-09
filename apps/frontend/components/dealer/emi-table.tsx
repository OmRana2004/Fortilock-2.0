"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";

export default function EmiTable() {
  return (
    <div className="mt-6 rounded-xl border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Installment</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow>
            <TableCell>#1</TableCell>
            <TableCell>09 Jul 2026</TableCell>
            <TableCell>₹1,866</TableCell>
            <TableCell>Paid</TableCell>

            <TableCell className="text-right">
              <Button
                size="sm"
                variant="outline"
              >
                View
              </Button>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>#2</TableCell>
            <TableCell>09 Aug 2026</TableCell>
            <TableCell>₹1,866</TableCell>
            <TableCell>Pending</TableCell>

            <TableCell className="text-right">
              <Button size="sm">
                Pay EMI
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}