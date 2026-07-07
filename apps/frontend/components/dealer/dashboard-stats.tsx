"use client";

import { useEffect, useState } from "react";
import {
  Users,
  UserCheck,
  UserX,
  CreditCard,
} from "lucide-react";

import StatCard from "../ui/stat-card";
import { api } from "@/lib/axios";

interface DashboardStats {
  totalCustomers: number;
  totalDeviceSales: number;
  activeLoans: number;
  pendingEmis: number;
  paidEmis: number;
}

export default function DashboardStats() {
  const [stats, setStats] =
    useState<DashboardStats>({
      totalCustomers: 0,
      totalDeviceSales: 0,
      activeLoans: 0,
      pendingEmis: 0,
      paidEmis: 0,
    });

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const response = await api.get<DashboardStats>(
          "/api/v1/dealer/dashboard"
        );

        setStats(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDashboardStats();
  }, []);

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
      <StatCard
        title="Total Customers"
        value={stats.totalCustomers}
        subtitle="Registered customers"
        icon={Users}
        iconBg="bg-blue-50"
        iconColor="text-blue-600"
      />

      <StatCard
        title="Total Device Sales"
        value={stats.totalDeviceSales}
        subtitle="Devices sold"
        icon={Users}
        iconBg="bg-violet-50"
        iconColor="text-violet-600"
      />

      <StatCard
        title="Active Loans"
        value={stats.activeLoans}
        subtitle="Currently active"
        icon={UserCheck}
        iconBg="bg-emerald-50"
        iconColor="text-emerald-600"
      />

      <StatCard
        title="Pending EMIs"
        value={stats.pendingEmis}
        subtitle="Upcoming payments"
        icon={CreditCard}
        iconBg="bg-amber-50"
        iconColor="text-amber-600"
      />

      <StatCard
        title="Paid EMIs"
        value={stats.paidEmis}
        subtitle="Completed payments"
        icon={UserX}
        iconBg="bg-red-50"
        iconColor="text-red-600"
      />
    </div>
  );
}