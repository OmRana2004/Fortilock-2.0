"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";

export default function CustomerHeader() {
  return (
    <div className="rounded-2xl border bg-card p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        {/* Customer Info */}
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold">
              Sita Sharma
            </h1>

            <Badge className="bg-green-600 hover:bg-green-600">
              Active
            </Badge>
          </div>

          <p className="mt-2 text-muted-foreground">
            Customer ID : CUS-0001
          </p>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-sm text-muted-foreground">
                Phone
              </p>

              <p className="font-medium">
                +91 9876543210
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Email
              </p>

              <p className="font-medium">
                sita@gmail.com
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Address
              </p>

              <p className="font-medium">
                Dehradun
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Joined
              </p>

              <p className="font-medium">
                09 Jul 2026
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