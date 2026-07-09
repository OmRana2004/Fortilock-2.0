"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function LoanCard() {
  return (
    <Card className="mt-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>
          Loan Summary
        </CardTitle>

        <Button variant="outline">
          Edit
        </Button>
      </CardHeader>

      <CardContent className="grid gap-6 md:grid-cols-3">
        <Info title="Device Price" value="₹26,000" />
        <Info title="Down Payment" value="₹6,000" />
        <Info title="Financed Amount" value="₹20,000" />
        <Info title="Interest Rate" value="12%" />
        <Info title="Interest Amount" value="₹2,400" />
        <Info title="Total Payable" value="₹22,400" />
        <Info title="Monthly EMI" value="₹1,866.67" />
        <Info title="Tenure" value="12 Months" />
        <Info title="Status" value="ACTIVE" />
      </CardContent>
    </Card>
  );
}

function Info({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-sm text-muted-foreground">
        {title}
      </p>

      <p className="mt-1 text-lg font-semibold">
        {value}
      </p>
    </div>
  );
}