"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import DeviceCard from "./device-card";
import LoanCard from "./loan-card";
import EmiTable from "./emi-table";
import PaymentHistory from "./payment-history";

export default function CustomerTabs() {
  return (
    <Tabs defaultValue="device">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="device">
          Device
        </TabsTrigger>

        <TabsTrigger value="loan">
          Loan
        </TabsTrigger>

        <TabsTrigger value="emi">
          EMI Schedule
        </TabsTrigger>

        <TabsTrigger value="payments">
          Payments
        </TabsTrigger>
      </TabsList>

      <TabsContent value="device">
        <DeviceCard />
      </TabsContent>

      <TabsContent value="loan">
        <LoanCard />
      </TabsContent>

      <TabsContent value="emi">
        <EmiTable />
      </TabsContent>

      <TabsContent value="payments">
        <PaymentHistory />
      </TabsContent>
    </Tabs>
  );
}