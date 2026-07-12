"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";

interface Customer {
  id: string;
  phone: string;
  address: string;
  isActive: boolean;
  createdAt: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}


interface CustomerHeaderProps {
  customer: Customer;
}


export default function CustomerHeader({
  customer,
}: CustomerHeaderProps) {
  return (
    <div className="rounded-2xl border bg-card p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        {/* Customer Info */}
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold">
             {customer.user.name}
            </h1>

            <Badge
  className={
    customer.isActive
      ? "bg-green-600"
      : "bg-red-600"
  }
>
  {customer.isActive ? "Active" : "Inactive"}
</Badge>
          </div>

          <p className="mt-2 text-muted-foreground">
           {customer.id}
          </p>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-sm text-muted-foreground">
                Phone
              </p>

              <p className="font-medium">
                {customer.phone}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Email
              </p>

              <p className="font-medium">
                {customer.user.email}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Address
              </p>

              <p className="font-medium">
                {customer.address}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Joined
              </p>

              <p className="font-medium">
                {new Date(customer.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button variant="outline">
            Edit Customer
          </Button>

          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Device
          </Button>

          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Loan
          </Button>
        </div>
      </div>
    </div>
  );
}