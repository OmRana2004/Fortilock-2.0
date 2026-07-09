"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

    interface Device {
        id : string;
        brand: string;
        model: string;
        imei: string;
        salePrice: string;
        purchaseDate: string
    }

    interface Props {
        device: Device | null;
        onEdit?: () => void;
    }

export default function DeviceCard({
    
}) {
  return (
    <Card className="mt-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>
          Device Information
        </CardTitle>

        <Button variant="outline">
          Edit
        </Button>
      </CardHeader>

      <CardContent className="grid gap-6 md:grid-cols-2">
        <Info title="Brand" value="Xiaomi" />
        <Info title="Model" value="Redmi Note 10 Pro" />
        <Info title="IMEI" value="789654123456" />
        <Info title="Sale Price" value="₹26,000" />
        <Info title="Purchase Date" value="09 Jul 2026" />
        <Info title="Status" value="Registered" />
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